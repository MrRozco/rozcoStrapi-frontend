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

export default async function Home() {
  const queryParams = {
  populate: {
    Estructura: {
      on: {
        'plano.tarjetas': {
          populate: {
            tarjeta: {
              populate: ['Foto'], // Explicitly populate the Foto field
            },
          },
        },
        // Add other components if needed, e.g.:
        'plano.heroe': { populate: '*' },
        'plano.slider': { populate: '*' },
        'plano.video-componente': { populate: '*' },
        'plano.cta': { populate: '*' },
        // etc.
      },
    },
  },
};

  const response = await fetchFromStrapi('pagina-inicial', queryParams);
  if (!response || !response.data) {
    return <div>404 - Page Not Found</div>;
  }
  const homepage = response.data; // Extract the 'attributes' object

  return <PageRenderer page={homepage} />;
}