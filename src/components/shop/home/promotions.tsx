'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { EmblaOptionsType } from 'embla-carousel';
import Image from 'next/image';
import clsx from 'clsx';

import { promotions } from '@/lib/shop/constants/home/promotions-data';
import { getPlaceholder } from '@/lib/shop/media/cloudinary';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUpRightIcon,
} from '@/lib/shop/icons';
import Link from 'next/link';

const Promotions = () => {
  const options: EmblaOptionsType = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 5000 }),
  ]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onPrevButtonClick = React.useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = React.useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('init', onInit);

    // Initial setup
    onInit();
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('init', onInit);
    };
  }, [emblaApi]);

  return (
    <section className="py-[35px]">
      <div className="mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-dark text-3xl font-semibold">Акції</h2>
            <Link
              href="/promotions"
              className="text-yellow-dark ml-[30px] hidden items-center text-lg font-semibold md:flex"
            >
              Дивитись всі
              <ArrowUpRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <button
              onClick={onPrevButtonClick}
              className="text-yellow-dark flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={onNextButtonClick}
              className="text-yellow-dark flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex md:-ml-[30px]">
              {promotions.map((promotion) => (
                <div
                  key={promotion.id}
                  className="relative h-[280px] w-full flex-shrink-0 md:w-1/3 md:pl-[30px]"
                >
                  <Image
                    src={getPlaceholder('promotions', promotion.id)}
                    alt={promotion.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center space-x-[10px] md:hidden">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onDotButtonClick(index)}
                className={clsx(
                  'h-[15px] w-[15px] rounded-full border-2 transition-colors duration-200',
                  index === selectedIndex
                    ? 'bg-yellow-dark border-white'
                    : 'border-gray-400 bg-white',
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
