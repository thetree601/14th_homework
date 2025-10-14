"use client";

import Banner from "../../../components/ui/Banner";

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

export default function BannerWrapper() {
  return (
    <Banner 
      images={bannerImages}
      autoplay={true}
      autoplayDelay={3000}
    />
  );
};
