"use client";

import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { BannerProps } from "../../types";

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';

const defaultImages = [
  {
    src: '/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.png',
    alt: 'Tranquil Beachfront 1'
  },
  {
    src: '/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 2.png',
    alt: 'Tranquil Beachfront 2'
  },
  {
    src: '/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 3.png',
    alt: 'Tranquil Beachfront 3'
  }
];

export default function Banner({ 
  images = defaultImages, 
  autoplay = true, 
  autoplayDelay = 3000 
}: BannerProps) {
  return (
    <div className="bannerContainer">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ 
          clickable: true,
          bulletClass: 'bullet',
          bulletActiveClass: 'bulletActive'
        }}
        autoplay={autoplay ? {
          delay: autoplayDelay,
          disableOnInteraction: false,
        } : false}
        loop={true}
        className="swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="slide">
            <div className="imageContainer">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                className="bannerImage"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
