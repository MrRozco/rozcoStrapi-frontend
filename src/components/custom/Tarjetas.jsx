import Image from "next/image";

export default function Tarjetas({ tarjeta }) {
  return (
    <section className="container py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {tarjeta.map((item, index) => (
          <div
            key={index}
            className="bg-white/4 rounded-xl shadow-lg p-6 flex flex-col items-center
              transition-all duration-900 ease-out
              hover:scale-105
              hover:bg-gradient-to-r
              hover:from-white/5 hover:via-white/7 hover:to-white/7
              hover:bg-[length:200%_100%] bg-[length:100%_100%]
              hover:bg-right
              "
            style={{ backgroundPosition: "left" }}
          >
            {item.Foto && (
              <div className=" w-full h-[430px] mb-4 relative overflow-hidden rounded-lg flex-shrink-0">
                <Image
                  src={item.Foto.url.startsWith('http')
                    ? item.Foto.url
                    : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/${item.Foto.url.replace(/^\/+/, '')}`}
                  alt={item.Foto.alternativeText || item.Titulo}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  sizes="300px"
                  className="rounded-lg"
                />
              </div>
            )}
            <h3 className="text-xl font-bold mb-2 text-center">{item.Titulo}</h3>
            <p className="text-gray-100 text-center">{item.Texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}