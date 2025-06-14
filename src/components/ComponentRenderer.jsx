// components/ComponentRenderer.js
import Heroe from './custom/Heroe'
import VideoComponente from './custom/VideoComponente';
import Slider from './custom/Slider';
import CTA from './custom/CTA';
import Tarjetas from './custom/Tarjetas';
import TextoFoto from './custom/TextoFoto';
import TextoDobleFoto from './custom/TextDobleFoto';
// Add more components here as needed (e.g., TextBlock, Banner)

const componentMap = {
  'plano.heroe': Heroe,
  'plano.video-componente': VideoComponente,
  'plano.slider': Slider,
  'plano.cta': CTA,
  'plano.tarjetas': Tarjetas,
  'plano.texto-foto': TextoFoto,
  'plano.texto-doble-foto': TextoDobleFoto,
  // Example: 'plano.textBlock': TextBlock,
  // Add other component mappings as you create them
};

console.log("Component Map:", componentMap);

export default function ComponentRenderer({ component }) {
  const Component = componentMap[component.__component];
  if (!Component) {
    console.warn(`No component found for ${component.__component}`);
    return null;
  }

  return <Component {...component} />;
}