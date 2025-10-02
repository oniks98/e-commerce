'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { EmblaOptionsType } from 'embla-carousel';
import clsx from 'clsx';

interface CarouselProps {
  options?: EmblaOptionsType;
  slides: React.ReactNode[];
  prevButton?: React.ReactElement<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >;
  nextButton?: React.ReactElement<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >;
  className?: string;
  showDots?: boolean;
  gap?: number;
  perPage?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  options,
  slides,
  prevButton,
  nextButton,
  className,
  showDots = true,
  gap = 0,
  perPage = 1,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
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
    <div className={clsx('relative', className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div
          className="flex"
          style={{
            marginLeft: gap ? `-${gap}px` : undefined,
          }}
        >
          {slides.map((slide, index) => (
            <div
              className="flex-shrink-0"
              key={index}
              style={{
                width: perPage ? `calc(100% / ${perPage})` : '100%',
                paddingLeft: gap ? `${gap}px` : undefined,
              }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showDots && scrollSnaps.length > 0 && (
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
                index === selectedIndex ? 'bg-yellow' : 'bg-light',
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
