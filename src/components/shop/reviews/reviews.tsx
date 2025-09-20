'use client';

import clsx from 'clsx';

import { reviewsData } from '@/lib/shop/constants/reviews-data';
import { getPlaceholder } from '@/lib/shop/media/cloudinary';
import StarIcon from '@/lib/shop/icons/star-icon';
import AddIcon from '@/lib/shop/icons/add-icon';
import ChatIcon from '@/lib/shop/icons/chat-icon';
import ArrowScrollIcon from '@/lib/shop/icons/arrow-scroll-icon';
import RegistrationIcon from '@/lib/shop/icons/registration-icon';
import { useRef, useState, UIEvent, WheelEvent, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviewsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollContainerXlRef.current) {
      scrollContainerXlRef.current.scrollTo({
        left: currentReview * 480,
        behavior: 'smooth',
      });
    }
    if (scrollContainerMdRef.current) {
      scrollContainerMdRef.current.scrollTo({
        left: currentReview * 480,
        behavior: 'smooth',
      });
    }
  }, [currentReview]);

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
    <section className="bg-grey-light-r overflow-hidden py-10 md:pt-[70px] md:pb-[50px]">
      {/* Десктопная версия */}
      <div className="hidden md:block">
        {/* Для больших экранов (xl и выше) - layout с боковым инфоблоком */}
        <div
          className="relative hidden pb-[90px] xl:block"
          onMouseMove={handleThumbMouseMoveXl}
          onMouseUp={handleThumbMouseUpXl}
        >
          {/* Информационный блок */}
          <div className="relative z-10 mx-auto px-[35px] xl:w-[1360px]">
            <div className="w-[410px] pt-4 pr-[40px]">
              <h2 className="text-dark text-left text-4xl font-semibold">
                Останні відгуки
              </h2>
              <div className="mt-[48px]">
                <div className="flex">
                  <div className="h-[80px] w-[80px] rounded-full bg-white" />
                  <div className="ml-[30px]">
                    <h3 className="text-dark text-left text-xl font-semibold">
                      Магазин меблів для дому «KROVATO»
                    </h3>
                    <div className="mt-[20px] flex items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarIcon key={index} />
                        ))}
                      </div>
                      <span className="text-yellow-dark ml-[10px] text-lg font-semibold">
                        5.0
                      </span>
                    </div>
                    <p className="text-grey mt-[22px] text-left text-sm font-light">
                      Базовано на відгуках: 269
                    </p>
                  </div>
                </div>
                <div className="mt-[40px] flex items-center justify-between">
                  <button
                    className={clsx(
                      'h-[50px] w-[210px]',
                      'flex items-center justify-center',
                      'bg-yellow rounded-lg text-white',
                    )}
                  >
                    <AddIcon />
                    <span className="ml-[15px] text-lg font-semibold">
                      Написати відгук
                    </span>
                  </button>
                  <Link href="/reviews">
                    <button
                      className={clsx(
                        'h-[50px] w-[170px]',
                        'flex items-center justify-center',
                        'text-grey',
                      )}
                    >
                      <ChatIcon />
                      <span className="ml-[15px] text-lg font-semibold">
                        Всі відгуки
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Карточки отзывов - выходят за правый край */}
          <div
            className="absolute top-0 left-0 flex h-[400px] w-full items-start pt-4"
            style={{ paddingLeft: 'max(35px, calc(50vw - 680px + 450px))' }}
          >
            <div
              ref={scrollContainerXlRef}
              onScroll={handleScrollXl}
              onWheel={handleWheelXl}
              className="scrollbar-hide w-full overflow-x-auto overflow-y-hidden"
            >
              <div className="flex gap-[30px] pr-10">
                {reviewsData.map((review) => (
                  <div
                    key={review.id}
                    className="h-[370px] w-[450px] flex-shrink-0 rounded-lg bg-white p-[30px] shadow-md"
                  >
                    <div className="flex items-center">
                      <div className="border-yellow relative h-[50px] w-[50px] rounded-full border">
                        <RegistrationIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div className="ml-[20px] flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-dark text-right text-base font-normal">
                            {review.author}
                          </h4>
                          <span className="text-grey text-right text-base font-normal">
                            {review.date}
                          </span>
                        </div>
                        <div className="mt-[2px] flex">
                          {Array.from({ length: review.rating }).map(
                            (_, index) => (
                              <div
                                key={index}
                                className="text-yellow h-[24px] w-[24px]"
                              >
                                <StarIcon />
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="custom-scrollbar mt-[30px] h-[150px] overflow-y-auto">
                      <p className="text-grey text-left text-base font-light">
                        {review.text}
                      </p>
                    </div>
                    <div className="mt-[30px] flex items-center">
                      <Image
                        src={getPlaceholder('product', review.product.image)}
                        alt={review.product.name}
                        width={50}
                        height={50}
                        className="h-[50px] w-[50px] rounded-full"
                      />
                      <span className="text-grey ml-[10px] text-left text-lg font-semibold">
                        {review.product.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Кастомный скроллбар для XL - НИЖЕ карточек */}
          <div
            className="absolute bottom-0 left-0 z-10 w-full"
            style={{
              paddingLeft: 'max(35px, calc(50vw - 680px + 450px))',
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

        {/* Для средних экранов (md-xl) - вертикальный layout */}
        <div
          className="block xl:hidden"
          onMouseMove={handleThumbMouseMoveMd}
          onMouseUp={handleThumbMouseUpMd}
        >
          <div className="mx-auto max-w-[1200px] px-[35px]">
            {/* Информационный блок сверху */}
            <div className="mb-10 text-center">
              <h2 className="text-dark mb-[48px] text-4xl font-semibold">
                Останні відгуки
              </h2>
              <div className="flex flex-col items-center">
                <div className="mb-[20px] h-[80px] w-[80px] rounded-full bg-white" />
                <h3 className="text-dark mb-[20px] text-xl font-semibold">
                  Магазин меблів для дому «KROVATO»
                </h3>
                <div className="mb-[22px] flex items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon key={index} />
                    ))}
                  </div>
                  <span className="text-yellow-dark ml-[10px] text-lg font-semibold">
                    5.0
                  </span>
                </div>
                <p className="text-grey mb-[30px] text-sm font-light">
                  Базовано на відгуках: 269
                </p>
                <div className="flex flex-col items-center gap-5 sm:flex-row">
                  <button
                    className={clsx(
                      'h-[50px] w-[210px]',
                      'flex items-center justify-center',
                      'bg-yellow rounded-lg text-white',
                    )}
                  >
                    <AddIcon />
                    <span className="ml-[15px] text-lg font-semibold">
                      Написати відгук
                    </span>
                  </button>
                  <Link href="/reviews">
                    <button
                      className={clsx(
                        'h-[50px] w-[170px]',
                        'flex items-center justify-center',
                        'text-grey',
                      )}
                    >
                      <ChatIcon />
                      <span className="ml-[15px] text-lg font-semibold">
                        Всі відгуки
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Карточки отзывов на средних экранах */}
            <div
              ref={scrollContainerMdRef}
              onScroll={handleScrollMd}
              onWheel={handleWheelMd}
              className="scrollbar-hide overflow-x-auto overflow-y-hidden"
            >
              <div className="flex gap-[30px] pb-4">
                {reviewsData.map((review) => (
                  <div
                    key={review.id}
                    className="h-[370px] w-[450px] flex-shrink-0 rounded-lg bg-white p-[30px] shadow-md"
                  >
                    <div className="flex items-center">
                      <div className="border-yellow relative h-[50px] w-[50px] rounded-full border">
                        <RegistrationIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div className="ml-[20px] flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-dark text-right text-base font-normal">
                            {review.author}
                          </h4>
                          <span className="text-grey text-right text-base font-normal">
                            {review.date}
                          </span>
                        </div>
                        <div className="mt-[2px] flex">
                          {Array.from({ length: review.rating }).map(
                            (_, index) => (
                              <div
                                key={index}
                                className="text-yellow h-[24px] w-[24px]"
                              >
                                <StarIcon />
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="custom-scrollbar mt-[30px] h-[150px] overflow-y-auto">
                      <p className="text-grey text-left text-base font-light">
                        {review.text}
                      </p>
                    </div>
                    <div className="mt-[30px] flex items-center">
                      <Image
                        src={getPlaceholder('product', review.product.image)}
                        alt={review.product.name}
                        width={50}
                        height={50}
                        className="h-[50px] w-[50px] rounded-full"
                      />
                      <span className="text-grey ml-[10px] text-left text-lg font-semibold">
                        {review.product.name}
                      </span>
                    </div>
                  </div>
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
        <div className="mx-auto px-[35px]">
          <h2 className="text-dark text-center text-3xl font-semibold">
            Останні відгуки
          </h2>

          <div className="mt-[48px]">
            <div className="flex flex-col items-center">
              <div className="h-[80px] w-[80px] rounded-full bg-white" />
              <div className="mt-[20px] text-center">
                <h3 className="text-dark text-xl font-semibold">
                  Магазин меблів для дому «KROVATO»
                </h3>
                <div className="mt-[20px] flex items-center justify-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon key={index} />
                    ))}
                  </div>
                  <span className="text-yellow-dark ml-[10px] text-lg font-semibold">
                    5.0
                  </span>
                </div>
                <p className="text-grey mt-[22px] text-sm font-light">
                  Базовано на відгуках: 269
                </p>
              </div>
            </div>
            <div className="mt-[30px] flex flex-col items-center gap-5">
              <button
                className={clsx(
                  'h-[50px] w-full max-w-[345px]',
                  'flex items-center justify-center',
                  'bg-yellow rounded-lg text-white',
                )}
              >
                <AddIcon />
                <span className="ml-[15px] text-lg font-semibold">
                  Написати відгук
                </span>
              </button>
              <Link href="/reviews" className="w-full max-w-[345px]">
                <button
                  className={clsx(
                    'h-[50px] w-full',
                    'flex items-center justify-center',
                    'text-grey',
                  )}
                >
                  <ChatIcon />
                  <span className="ml-[15px] text-lg font-semibold">
                    Всі відгуки
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Мобильные карточки отзывов */}
        <div className="mt-10">
          <div className="overflow-hidden">
            <div className="flex gap-[30px] px-4">
              {reviewsData.map((review) => (
                <div
                  key={review.id}
                  className="h-[370px] w-full flex-shrink-0 rounded-lg bg-white p-[30px] shadow-md"
                >
                  <div className="flex items-center">
                    <div className="border-yellow relative h-[50px] w-[50px] rounded-full border">
                      <RegistrationIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="ml-[20px] flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-dark text-right text-base font-normal">
                          {review.author}
                        </h4>
                        <span className="text-grey text-right text-base font-normal">
                          {review.date}
                        </span>
                      </div>
                      <div className="mt-[2px] flex">
                        {Array.from({ length: review.rating }).map(
                          (_, index) => (
                            <div
                              key={index}
                              className="text-yellow h-[24px] w-[24px]"
                            >
                              <StarIcon />
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="custom-scrollbar mt-[30px] h-[150px] overflow-y-auto">
                    <p className="text-grey text-left text-base font-light">
                      {review.text}
                    </p>
                  </div>
                  <div className="mt-[30px] flex items-center">
                    <Image
                      src={getPlaceholder('product', review.product.image)}
                      alt={review.product.name}
                      width={50}
                      height={50}
                      className="h-[50px] w-[50px] rounded-full"
                    />
                    <span className="text-grey ml-[10px] text-left text-lg font-semibold">
                      {review.product.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Мобильные точки пагинации */}
        <div className="mt-[40px] flex flex-col items-center">
          <div className="flex items-center gap-x-2.5">
            {reviewsData.map((_, index) => (
              <div
                key={index}
                className={clsx(
                  'h-[15px] w-[15px] cursor-pointer rounded-full',
                  currentReview === index ? 'bg-yellow' : 'bg-grey-light',
                )}
                onClick={() => setCurrentReview(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
