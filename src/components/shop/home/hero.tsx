'use client';

import Image from 'next/image';

import clsx from 'clsx';
import { EmblaOptionsType } from 'embla-carousel';

import Carousel from '@/components/shop/ui/carousel';

import { slides } from '@/lib/shop/constants/home/hero-data';
import { ChevronLeftIcon, ChevronRightIcon } from '@/lib/shop/icons';

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  const options: EmblaOptionsType = { loop: true };

  const slideComponents = slides.map((slide) => (
    <div key={slide.id} className="relative h-[420px] w-full md:h-[600px]">
      <Image
        src={slide.image}
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
      className={clsx(
        'absolute top-1/2 left-5 -translate-y-1/2',
        'h-[60px] w-[60px]',
        'flex items-center justify-center',
        'rounded-full bg-white',
        'text-yellow',
        'transition-all duration-200 hover:bg-gray-50',
        'hidden md:flex',
      )}
      aria-label="Previous slide"
    >
      <ChevronLeftIcon />
    </button>
  );

  const nextButton = (
    <button
      type="button"
      className={clsx(
        'absolute top-1/2 right-5 -translate-y-1/2',
        'h-[60px] w-[60px]',
        'flex items-center justify-center',
        'rounded-full bg-white',
        'text-yellow',
        'transition-all duration-200 hover:bg-gray-50',
        'hidden md:flex',
      )}
      aria-label="Next slide"
    >
      <ChevronRightIcon />
    </button>
  );

  return (
    <section className={clsx('mx-auto h-auto w-full py-[35px]', className)}>
      <Carousel
        slides={slideComponents}
        options={options}
        prevButton={prevButton}
        nextButton={nextButton}
      />
    </section>
  );
};

export default Hero;
