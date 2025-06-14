"use client";
import React, { useRef, useState } from 'react';
import { Virtual, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Slider({ Titulo, Subtitulo, Fotos, texto }) {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <div className="container flex flex-col items-start justify-center w-full gap-8">
      <h2>{Titulo}</h2>
      <div className='w-full flex gap-5 items-center '>
         <div className='w-1/2 sm:w-1/5'>
            <h3 className='mb-8'>{Subtitulo}</h3>
            <p className=''>{texto}</p>
        </div>
        <Swiper
            modules={[Virtual, Navigation, Pagination, Autoplay]}
            onSwiper={setSwiperRef}
            breakpoints={{
              0: { slidesPerView: 1 },      // 1 slide for very small screens
              640: { slidesPerView: 2 },    // 2 slides for >= 640px
              1024: { slidesPerView: 2 },   // 3 slides for >= 1024px
              1280: { slidesPerView: 4 },   // 5 slides for >= 1280px
            }}
            centeredSlides={false}
            spaceBetween={100}
            navigation={false}
            virtual
            autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            }}
            className="mySwiper w-1/2 sm:w-4/5"
        >
            {Fotos.map((foto, index) => (
            <SwiperSlide key={foto.url} virtualIndex={index}>
                <div className=" relative flex items-center">
                <Image
                    src={
                        foto.url.startsWith('http')
                            ? foto.url
                            : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/${foto.url.replace(/^\/+/, '')}`
                        }
                    alt={`Slide ${index + 1}`}
                    width={500}
                    height={700}
                    className=" rounded-2xl z-30"
                />
                {/* Number label */}
                <span
                    className="absolute left-[-70px] bottom-0  text-[#fff] opacity-90 text-[130px] font-bold px-4 py-2 shadow-lg "
                    style={{ pointerEvents: 'none' }}
                >
                    {index + 1}
                </span>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}