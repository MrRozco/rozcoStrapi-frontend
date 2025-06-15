import Link from "next/link";

export default function CTA({ titulo, contenido, Boton, Background }) {


    return (
        <section 
        className="container relative text-white py-3xl px-md flex flex-col items-center h-[55vh] justify-center text-center"  
            style={
            Background ? {
                backgroundImage: `url(${
                        Background.url.startsWith('http')
                        ? Background.url
                        : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/${Background.url.replace(/^\/+/, '')}`
                    })`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            } : {}
        }>
            {/* Overlay for better text readability */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.2) 10%, rgba(0,0,0,1) 100%)',
                }}
                aria-hidden="true"
            ></div>
            <h2 className="z-10">{titulo}</h2>
            <h3 className="z-10 !text-[#fff]!">{contenido}</h3>
            <Link href={Boton?.url || '#'} className="px-15 py-2 md:py-5 bg-[#db0000] hover:bg-[#801c1c] z-10 m-5 rounded-lg text-2xl font-bold ">
                {Boton?.Texto || 'Learn More'}
            </Link>
            
        </section>
    )
}