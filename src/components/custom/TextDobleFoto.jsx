import Image from "next/image";

export default function TextoDobleFoto({ Titulo, Texto, primeraFoto, segundaFoto, derecha }) {
  return (
    <div className={`container flex flex-col ${derecha ? `lg:flex-row-reverse` : 'lg:flex-row'} py-15! items-center gap-10`}>
      <div className="flex gap-4 relative">
        {primeraFoto && (
          <div className="aspect-[9/16] w-40 md:w-80 relative -translate-y-4">
            <Image
              src={primeraFoto.url.startsWith("http")
                ? primeraFoto.url
                : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${primeraFoto.url}`}
              alt={primeraFoto.alternativeText || "Imagen"}
              fill
              className="object-cover rounded-2xl transition-all duration-900 ease-out hover:scale-105"
              sizes="(max-width: 768px) 50vw, 200px"

            />
          </div>
        )}
        {segundaFoto && (
          <div className="aspect-[9/16] w-40 md:w-80 relative translate-y-4">
            <Image
              src={segundaFoto.url.startsWith("http")
                ? segundaFoto.url
                : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${segundaFoto.url}`}
              alt={segundaFoto.alternativeText || "Imagen"}
              fill
              className="object-cover rounded-2xl transition-all duration-900 ease-out hover:scale-105"
              sizes="(max-width: 768px) 50vw, 200px"
            />
          </div>
        )}
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2">{Titulo}</h2>
        <p className=" md:text-3xl!">{Texto}</p>
      </div>
    </div>
  );
}