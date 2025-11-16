// app/[slug]/page.jsx
import PageRenderer from '@/components/PageRenderer';
import { fetchFromStrapi } from '@/lib/api';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  try {
    const data = await fetchFromStrapi('paginas', {
      fields: ['url'],
      pagination: { limit: 1000 },
    });

    if (!data?.data) {
      console.warn('⚠️ No pages found during build - check Strapi connection');
      return [];
    }

    const slugs = data.data
      .map((page) => page.url || page.attributes?.url)
      .filter(Boolean) // Remove null/undefined
      .map((url) => ({ slug: url }));

    console.log(`✅ Pre-building ${slugs.length} pages at build time`);
    return slugs;
  } catch (error) {
    console.error('❌ generateStaticParams failed:', error.message);
    return []; // Return empty to allow build to continue
  }
}

export const dynamicParams = true; // Allow new pages on-demand
export const revalidate = 86400; // Cache for 24 hours (content changes monthly)

export async function generateMetadata({ params }) {
  const { slug } = params;
  const query = {
    filters: { url: { $eq: slug } },
    populate: {},
  };
  const pageData = await fetchFromStrapi('paginas', query);
  const page = pageData?.data?.[0];

  return {
    title: page?.attributes?.Titulo || page?.Titulo || 'Default Title',
    description: page?.attributes?.Descripcion || page?.Descripcion || 'Default description',
  };
}

export default async function DynamicPage({ params }) {
  const { slug } = params;
  const query = {
    filters: { url: { $eq: slug } },
    populate: { Estructura: { populate: '*' } },
  };
  const pageData = await fetchFromStrapi('paginas', query);

  if (!pageData?.data?.length) {
    notFound();
  }
  return <PageRenderer page={pageData.data[0]} />;
}