"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import styles from './styles.module.css';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';

const Banner = () => {
  const bannerImages = [
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

  return (
    <div className={styles.bannerContainer}>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ 
          clickable: true,
          bulletClass: styles.bullet,
          bulletActiveClass: styles.bulletActive
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className={styles.swiper}
      >
        {bannerImages.map((image, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <div className={styles.imageContainer}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                className={styles.bannerImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
