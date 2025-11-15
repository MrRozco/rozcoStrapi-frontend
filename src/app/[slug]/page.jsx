import PageRenderer from '@/components/PageRenderer';
import { fetchFromStrapi } from '@/lib/api';

export async function generateStaticParams() {
  const data = await fetchFromStrapi('paginas', {
    fields: ['url'],               // we only need the slug field
    pagination: { limit: 1000 },   // increase if you have >1000 pages
  });

  if (!data?.data) return [];

  return data.data.map((page) => ({
    slug: page.url,   // <-- your Strapi field name
  }));
}

// -------------------------------------------------
// 2. ISR fallback for new pages + cache control
// -------------------------------------------------
export const dynamicParams = true;   // allow slugs not in generateStaticParams
export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = params;
  const queryParams = {
    filters: { url: { $eq: slug } },
    populate: {},
  };
  const pageData = await fetchFromStrapi("paginas", queryParams);

  const { Titulo, Descripcion} = pageData.data[0];

  return {
    title: Titulo || "Default Title",
    description: Descripcion || "Default description",
    // Add more meta tags as needed
  };
}

export default async function DynamicPage({ params }) {
  const { slug } = params;
  const queryParams = {
    filters: { url: { $eq: slug } },
    populate: { Estructura: { populate: '*' } },
  };
  const pageData = await fetchFromStrapi("paginas", queryParams);

  if (!pageData || !pageData.data || pageData.data.length === 0) {
    return <div>404 - Page Not Found</div>;
  }
  return <PageRenderer page={pageData.data[0]} />;
}