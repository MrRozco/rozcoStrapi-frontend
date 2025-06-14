import React from 'react';

export default function Heroe({ Titulo, Descripcion, Fondo }) {

  
  return (
    <section
      className=" container mb-5! relative text-white py-3xl px-md flex flex-col items-center justify-center min-h-[70vh] md:min-h-[85vh] "
      style={
        Fondo
          ? {
              backgroundImage: `url(${
            Fondo.url.startsWith('http')
              ? Fondo.url
              : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/${Fondo.url.replace(/^\/+/, '')}`
          })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : {}
      }
    >
      {/* Overlay for better text readability */}
      <div
        className="absolute inset-0 "
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
        }}
        aria-hidden="true"
      ></div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="">{Titulo}</h1>
        <h3 className="text-lg md:text-3xl! max-w-2xl mx-auto">{Descripcion}</h3>
      </div>
    </section>
  );
}