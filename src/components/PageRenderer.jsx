// components/PageRenderer.js
import ComponentRenderer from './ComponentRenderer';

export default function PageRenderer({ page }) {
  const { Titulo, Descripcion, Estructura } = page;

  console.log('titulo', Titulo);
  console.log('descripcion', Descripcion);
  
  return (
    <div>
      {Estructura && Estructura.map((component, index) => (
        <ComponentRenderer key={index} component={component} />
      ))}
    </div>
  );
}