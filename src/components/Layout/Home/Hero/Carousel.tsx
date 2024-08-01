"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/bundle"
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HiMenuAlt2 } from "react-icons/hi";
import Image from "next/image";
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay, Zoom } from "swiper/modules";

export default function Carousel() {
  return (
    <div className="mt-[0px] bg-[#FFFFFF] h-[160px] rounded-md lg:rounded-none  lg:h-[400px]">
      <div className="w-full   flex  justify-center  gap-4 ">
        <div className="flex flex-col w-full bg-white">
          <Swiper
             cssMode={true}
             navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
             }}
            pagination={
              {clickable: true,}
            }
            zoom={true}
            rewind={true}
            mousewheel={true}
            keyboard={true}
            autoplay={{
              delay: 3000, 
              disableOnInteraction: false, 
              pauseOnMouseEnter: true,
              reverseDirection: false, 
            }}
            modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay, Zoom]}
            className="mySwiper "
          >
            <SwiperSlide
              className="relative "
              style={{backgroundColor:"#FFFFFF"}}
            >
             <div className="relative w-full h-[160px] lg:h-[400px]">
                <Image
                  src="/fried7.jpeg"
                  alt="Slide 1"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={100}
                  className="rounded-md lg:rounded-none"
                />
              </div>
              <div className="absolute bottom-4 right-4 text-white bg-[#DD3131] p-2 rounded cursor-pointer">
                Order Now
              </div>
            </SwiperSlide>
            <SwiperSlide
              className="relative"
              style={{backgroundColor:"#F5F5F5"}}
            >
              <div className="relative w-full h-[160px] lg:h-[400px]">
                <Image
                  src="/fried.jpeg"
                  alt="Slide 1"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={100}
                  className="rounded-md lg:rounded-none"
                />
              </div>
              <div className="absolute bottom-4 right-4 text-white bg-[#DD3131] p-2 rounded cursor-pointer">
                Order Now
              </div>
            </SwiperSlide>
            <div className="swiper-button-next hidden lg:flex lg:items-center lg:justify-center lg:w-6 lg:h-6  lg:text-white  " style={{ right: '10px' }}></div>
          <div className="swiper-button-prev hidden lg:flex lg:items-center lg:justify-center lg:w-6 lg:h-6  lg:text-white   " style={{ left: '10px' }}></div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
