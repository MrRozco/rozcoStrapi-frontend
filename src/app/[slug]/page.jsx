import PageRenderer from '@/components/PageRenderer';
import { fetchFromStrapi } from '@/lib/api';

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