'use client';

import React from 'react';
import Carousel from '@/components/ui/carousel';
import { getPlaceholder } from '@/lib/shop/media/cloudinary';
import ArrowLeftIcon from '@/lib/shop/icons/arrow-left-icon';
import ArrowRightIcon from '@/lib/shop/icons/arrow-right-icon';
import { EmblaOptionsType } from 'embla-carousel';
import Image from 'next/image';
import clsx from 'clsx';

const slides = [
  {
    id: 'e1c99fbd75fef4721f21625d062aa7b4a4d22dd7',
    alt: 'Slide 1',
  },
  {
    id: 'd69e4f5a7a02d1bf4b341b58c83ff1951825da6a',
    alt: 'Slide 2',
  },
  {
    id: 'e1c99fbd75fef4721f21625d062aa7b4a4d22dd7',
    alt: 'Slide 3',
  },
];

const Hero = () => {
  const options: EmblaOptionsType = { loop: true };

  const slideComponents = slides.map((slide) => (
    <div key={slide.id} className="relative h-[420px] w-full md:h-[600px]">
      <Image
        src={getPlaceholder('banner', slide.id)}
        alt={slide.alt}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  ));

  const prevButton = (
    <button className="text-yellow absolute top-1/2 left-5 hidden h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-full bg-white md:flex">
      <ArrowLeftIcon />
    </button>
  );

  const nextButton = (
    <button className="text-yellow absolute top-1/2 right-5 hidden h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-full bg-white md:flex">
      <ArrowRightIcon />
    </button>
  );

  return (
    <div className="mx-auto h-auto w-full">
      <Carousel
        slides={slideComponents}
        options={options}
        prevButton={prevButton}
        nextButton={nextButton}
      />
    </div>
  );
};

export default Hero;
