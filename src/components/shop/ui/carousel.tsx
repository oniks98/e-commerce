'use client';

import React from 'react';

import clsx from 'clsx';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

interface CarouselProps {
  options?: EmblaOptionsType & { gap?: number; perPage?: number };

  slides: React.ReactNode[];
  prevButton?: React.ReactElement<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >;
  nextButton?: React.ReactElement<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >;
  className?: string;
  showDots?: boolean;
  onInit?: (api: EmblaCarouselType) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  options,
  slides,
  prevButton,
  nextButton,
  className,
  showDots = true,
  onInit,
}) => {
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

    const onInitCarousel = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      if (onInit) {
        onInit(emblaApi);
      }
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('init', onInitCarousel);

    // Initial setup
    onInitCarousel();
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('init', onInitCarousel);
    };
  }, [emblaApi, onInit]);

  return (
    <div className={clsx('relative', className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <ul
          className="flex"
          style={{ marginLeft: options?.gap ? `-${options.gap}px` : undefined }}
        >
          {slides.map((slide, index) => (
            <li
              className="flex-shrink-0"
              key={index}
              style={{
                width: options?.perPage
                  ? `calc(100% / ${options.perPage})`
                  : '100%',
                paddingLeft: options?.gap ? `${options.gap}px` : undefined,
              }}
            >
              {slide}
            </li>
          ))}
        </ul>
      </div>

      {showDots && (
        <div
          className={clsx(
            'absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center',
            'space-x-2',
          )}
        >
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onDotButtonClick(index)}
              className={clsx(
                'h-[15px] w-[15px] rounded-full transition-colors duration-200',
                index === selectedIndex ? 'bg-sky' : 'bg-light',
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {prevButton &&
        React.cloneElement(prevButton, {
          onClick: onPrevButtonClick,
          type: 'button',
        })}

      {nextButton &&
        React.cloneElement(nextButton, {
          onClick: onNextButtonClick,
          type: 'button',
        })}
    </div>
  );
};

export default Carousel;
