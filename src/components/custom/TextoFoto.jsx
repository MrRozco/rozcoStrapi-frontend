import Image from "next/image";
import Link from "next/link";

export default function TextoFoto({ Titulo, Texto, Foto, derecha, boton }) {
  return (
    <div className={`container flex flex-col ${derecha ? `lg:flex-row-reverse` : 'lg:flex-row'} items-center gap-10 p-4`}>
      <div className="flex-1">
        {Foto && (
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${Foto.url}`}
            alt={Foto.alternativeText || "Imagen"}
            width={500}
            height={300}
            className="w-full h-auto object-cover rounded-2xl transition-all duration-900 ease-out
              hover:scale-105"
          />
        )}
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2">{Titulo}</h2>
        <p className="text-lg">{Texto}</p>
        {boton && (
          <Link href={boton.url} className=" btn mt-4">
            {boton.texto}
          </Link>
        )}
      </div>
    </div>
  );
}