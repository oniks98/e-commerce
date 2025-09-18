'use client';

import React from 'react';
import Carousel from '@/components/ui/carousel';
import { getPlaceholder } from '@/lib/shop/media/cloudinary';
import ChevronLeftIcon from '@/lib/shop/icons/chevron-left-icon';
import ChevronRightIcon from '@/lib/shop/icons/chevron-right-icon';
import { EmblaOptionsType } from 'embla-carousel';
import Image from 'next/image';
import clsx from 'clsx';

interface HeroProps {
  className?: string;
}

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

const Hero: React.FC<HeroProps> = ({ className }) => {
  const options: EmblaOptionsType = { loop: true };

  const slideComponents = slides.map((slide) => (
    <div key={slide.id} className="relative h-[420px] w-full md:h-[600px]">
      <Image
        src={getPlaceholder('banner', slide.id)}
        alt={slide.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
        className="rounded-lg"
      />
    </div>
  ));

  const prevButton = (
    <button
      type="button"
      className="text-yellow absolute top-1/2 left-5 hidden h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-full bg-white transition-all duration-200 hover:bg-gray-50 md:flex"
      aria-label="Previous slide"
    >
      <ChevronLeftIcon />
    </button>
  );

  const nextButton = (
    <button
      type="button"
      className="text-yellow absolute top-1/2 right-5 hidden h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-full bg-white transition-all duration-200 hover:bg-gray-50 md:flex"
      aria-label="Next slide"
    >
      <ChevronRightIcon />
    </button>
  );

  return (
    <div className={clsx('mx-auto h-auto w-full', className)}>
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
