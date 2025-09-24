'use client';

import { useRef, useState, UIEvent, WheelEvent, useEffect } from 'react';
import { reviewsData } from '@/lib/shop/constants/reviews-data';
import CompanyInfoBlock from '@/components/shop/reviews/company-info-block';
import ReviewCard from '@/components/shop/reviews/review-card';
import MobilePagination from '@/components/shop/reviews/mobile-pagination';
import { ArrowScrollIcon } from '@/lib/shop/icons';

const Reviews = () => {
  const scrollContainerXlRef = useRef<HTMLDivElement>(null);
  const scrollContainerMdRef = useRef<HTMLDivElement>(null);
  const scrollbarXlRef = useRef<HTMLDivElement>(null);
  const scrollbarMdRef = useRef<HTMLDivElement>(null);
  const thumbXlRef = useRef<HTMLDivElement>(null);
  const thumbMdRef = useRef<HTMLDivElement>(null);
  const [isDraggingXl, setIsDraggingXl] = useState(false);
  const [isDraggingMd, setIsDraggingMd] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  // Auto-slide для мобильной версии
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviewsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handlers for XL screens
  const handleScrollXl = (e: UIEvent<HTMLDivElement>) => {
    if (
      scrollContainerXlRef.current &&
      scrollbarXlRef.current &&
      thumbXlRef.current
    ) {
      const scrollPercentage =
        e.currentTarget.scrollLeft /
        (e.currentTarget.scrollWidth - e.currentTarget.clientWidth);
      const scrollbarWidth = scrollbarXlRef.current.clientWidth;
      const thumbWidth = thumbXlRef.current.clientWidth;
      const thumbPosition = scrollPercentage * (scrollbarWidth - thumbWidth);
      thumbXlRef.current.style.transform = `translateX(${thumbPosition}px)`;
    }
  };

  const handleThumbMouseDownXl = () => {
    setIsDraggingXl(true);
  };

  const handleThumbMouseUpXl = () => {
    setIsDraggingXl(false);
  };

  const handleThumbMouseMoveXl = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      isDraggingXl &&
      scrollContainerXlRef.current &&
      scrollbarXlRef.current &&
      thumbXlRef.current
    ) {
      const scrollbarRect = scrollbarXlRef.current.getBoundingClientRect();
      const thumbWidth = thumbXlRef.current.clientWidth;
      let newLeft = e.clientX - scrollbarRect.left - thumbWidth / 2;

      if (newLeft < 0) newLeft = 0;
      if (newLeft > scrollbarRect.width - thumbWidth) {
        newLeft = scrollbarRect.width - thumbWidth;
      }

      const scrollPercentage = newLeft / (scrollbarRect.width - thumbWidth);
      scrollContainerXlRef.current.scrollLeft =
        scrollPercentage *
        (scrollContainerXlRef.current.scrollWidth -
          scrollContainerXlRef.current.clientWidth);
    }
  };

  // Handlers for MD screens
  const handleScrollMd = (e: UIEvent<HTMLDivElement>) => {
    if (
      scrollContainerMdRef.current &&
      scrollbarMdRef.current &&
      thumbMdRef.current
    ) {
      const scrollPercentage =
        e.currentTarget.scrollLeft /
        (e.currentTarget.scrollWidth - e.currentTarget.clientWidth);
      const scrollbarWidth = scrollbarMdRef.current.clientWidth;
      const thumbWidth = thumbMdRef.current.clientWidth;
      const thumbPosition = scrollPercentage * (scrollbarWidth - thumbWidth);
      thumbMdRef.current.style.transform = `translateX(${thumbPosition}px)`;
    }
  };

  const handleThumbMouseDownMd = () => {
    setIsDraggingMd(true);
  };

  const handleThumbMouseUpMd = () => {
    setIsDraggingMd(false);
  };

  const handleThumbMouseMoveMd = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      isDraggingMd &&
      scrollContainerMdRef.current &&
      scrollbarMdRef.current &&
      thumbMdRef.current
    ) {
      const scrollbarRect = scrollbarMdRef.current.getBoundingClientRect();
      const thumbWidth = thumbMdRef.current.clientWidth;
      let newLeft = e.clientX - scrollbarRect.left - thumbWidth / 2;

      if (newLeft < 0) newLeft = 0;
      if (newLeft > scrollbarRect.width - thumbWidth) {
        newLeft = scrollbarRect.width - thumbWidth;
      }

      const scrollPercentage = newLeft / (scrollbarRect.width - thumbWidth);
      scrollContainerMdRef.current.scrollLeft =
        scrollPercentage *
        (scrollContainerMdRef.current.scrollWidth -
          scrollContainerMdRef.current.clientWidth);
    }
  };

  const handleWheelXl = (e: WheelEvent<HTMLDivElement>) => {
    if (scrollContainerXlRef.current) {
      scrollContainerXlRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleWheelMd = (e: WheelEvent<HTMLDivElement>) => {
    if (scrollContainerMdRef.current) {
      scrollContainerMdRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section className="bg-grey-light-r overflow-hidden py-10 md:pt-[70px] md:pb-[70px]">
      {/* Десктопная версия */}
      <div className="hidden md:block">
        {/* XL screens - layout с боковым инфоблоком */}
        <div
          className="relative hidden pb-[90px] xl:block"
          onMouseMove={handleThumbMouseMoveXl}
          onMouseUp={handleThumbMouseUpXl}
        >
          {/* Карточки отзывов - БЕЗ absolute позиционирования */}
          <div
            className="flex w-full items-start pt-4"
            style={{
              paddingLeft: 'max(35px, calc(50vw - 645px))',
              paddingRight: '35px',
            }}
          >
            {/* CompanyInfoBlock - слева */}
            <div className="w-[450px] flex-shrink-0">
              <CompanyInfoBlock variant="xl-sidebar" />
            </div>

            {/* Контейнер с карточками - справа */}
            <div className="flex-1 overflow-hidden">
              <div
                ref={scrollContainerXlRef}
                onScroll={handleScrollXl}
                onWheel={handleWheelXl}
                className="scrollbar-hide w-full overflow-x-auto overflow-y-visible"
              >
                <div className="flex gap-[30px] pr-10 pl-[30px]">
                  {reviewsData.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Кастомный скроллбар для XL - НИЖЕ карточек */}
          <div
            className="absolute bottom-0 left-0 z-10 w-full"
            style={{
              paddingLeft: 'max(35px, calc(50vw - 645px + 450px + 30px))',
              paddingRight: '35px',
            }}
          >
            <div
              className="bg-grey-light relative h-[6px] w-full"
              ref={scrollbarXlRef}
            >
              <div
                className="border-grey-light absolute top-[-27px] flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full border bg-white shadow-md"
                ref={thumbXlRef}
                onMouseDown={handleThumbMouseDownXl}
              >
                <ArrowScrollIcon />
              </div>
            </div>
          </div>
        </div>

        {/* MD screens - вертикальный layout */}
        <div
          className="block xl:hidden"
          onMouseMove={handleThumbMouseMoveMd}
          onMouseUp={handleThumbMouseUpMd}
        >
          <div className="mx-auto max-w-[1200px] px-[35px]">
            <CompanyInfoBlock variant="md-vertical" />

            {/* Карточки отзывов на средних экранах */}
            <div
              ref={scrollContainerMdRef}
              onScroll={handleScrollMd}
              onWheel={handleWheelMd}
              className="scrollbar-hide overflow-x-auto overflow-y-visible"
            >
              <div className="flex gap-[30px] pb-4">
                {reviewsData.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>

            {/* Скроллбар для средних экранов */}
            <div className="mt-[30px]">
              <div
                className="bg-grey-light relative h-[6px] w-full"
                ref={scrollbarMdRef}
              >
                <div
                  className="border-grey-light absolute top-[-27px] flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full border bg-white shadow-md"
                  ref={thumbMdRef}
                  onMouseDown={handleThumbMouseDownMd}
                >
                  <ArrowScrollIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильная версия */}
      <div className="block md:hidden">
        <CompanyInfoBlock variant="mobile" />

        {/* Мобильные карточки отзывов */}
        <div className="mt-10">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${currentReview * 100}%)`,
              }}
            >
              {reviewsData.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <ReviewCard review={review} isMobile={true} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <MobilePagination
          totalItems={reviewsData.length}
          currentIndex={currentReview}
          onPageChange={setCurrentReview}
        />
      </div>
    </section>
  );
};

export default Reviews;
