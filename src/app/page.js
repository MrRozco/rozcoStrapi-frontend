import PageRenderer from '@/components/PageRenderer';
import { fetchFromStrapi } from '@/lib/api';

export async function generateMetadata() {
  const queryParams = {
    populate: {},
  };
  const response = await fetchFromStrapi('pagina-inicial', queryParams);

  // Adjust according to your Strapi structure
  const { Titulo, Descripcion } = response?.data || {};

  return {
    title: Titulo || "Default Title",
    description: Descripcion || "Default description",
    // Add more meta tags as needed
  };
}
export const revalidate = 60;

// -------------------------------------------------
// 3. Home Page Component
// -------------------------------------------------
export default async function Home() {
  const queryParams = {
    populate: {
      Estructura: {
        on: {
          'plano.tarjetas': {
            populate: {
              tarjeta: {
                populate: ['Foto'],
              },
            },
          },
          'plano.heroe': { populate: '*' },
          'plano.slider': { populate: '*' },
          'plano.video-componente': { populate: '*' },
          'plano.cta': { populate: '*' },
          // Add more components here if needed
        },
      },
    },
  };

  const response = await fetchFromStrapi('pagina-inicial', queryParams);

  if (!response?.data) {
    notFound(); // Triggers Next.js 404 page
  }

  const homepage = response.data; // Full Strapi object: { id, attributes, ... }

  return <PageRenderer page={homepage} />;
}