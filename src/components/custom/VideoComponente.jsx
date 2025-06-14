

export default function VideoComponente ({ Titulo, Descripcion, Video }) {


    return (
        <div className="container flex flex-col  items-center justify-center w-full gap-8  ">
            <div className=" -mt-30 md:-mt-45! lg:-mt-40 overflow-visible z-20 ">
                <video className="w-full max-w-4xl  rounded-4xl border-7 border-[#d3f6f6]" controls>
                    <source src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${Video.url}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h2 className=" text-center" >{Titulo}</h2>
                <p className="text-center">{Descripcion}</p>
            </div>
        </div>
    );
}