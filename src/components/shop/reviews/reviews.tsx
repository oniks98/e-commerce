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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviewsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: currentReview * 480,
        behavior: 'smooth',
      });
    }
  }, [currentReview]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (
      scrollContainerRef.current &&
      scrollbarRef.current &&
      thumbRef.current
    ) {
      const scrollPercentage =
        e.currentTarget.scrollLeft /
        (e.currentTarget.scrollWidth - e.currentTarget.clientWidth);
      const scrollbarWidth = scrollbarRef.current.clientWidth;
      const thumbWidth = thumbRef.current.clientWidth;
      const thumbPosition = scrollPercentage * (scrollbarWidth - thumbWidth);
      thumbRef.current.style.transform = `translateX(${thumbPosition}px)`;
    }
  };

  const handleThumbMouseDown = () => {
    setIsDragging(true);
  };

  const handleThumbMouseUp = () => {
    setIsDragging(false);
  };

  const handleThumbMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      isDragging &&
      scrollContainerRef.current &&
      scrollbarRef.current &&
      thumbRef.current
    ) {
      const scrollbarRect = scrollbarRef.current.getBoundingClientRect();
      const thumbWidth = thumbRef.current.clientWidth;
      let newLeft = e.clientX - scrollbarRect.left - thumbWidth / 2;

      if (newLeft < 0) newLeft = 0;
      if (newLeft > scrollbarRect.width - thumbWidth) {
        newLeft = scrollbarRect.width - thumbWidth;
      }

      const scrollPercentage = newLeft / (scrollbarRect.width - thumbWidth);
      scrollContainerRef.current.scrollLeft =
        scrollPercentage *
        (scrollContainerRef.current.scrollWidth -
          scrollContainerRef.current.clientWidth);
    }
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section
      className="bg-grey-light-r py-10 md:pt-[70px] md:pb-[50px]"
      onMouseMove={handleThumbMouseMove}
      onMouseUp={handleThumbMouseUp}
    >
      <div className="mx-auto px-[35px] xl:w-[1360px]">
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="md:w-[410px] md:pt-4 md:pr-[40px]">
            <h2 className="text-dark text-center text-3xl font-semibold md:text-left md:text-4xl">
              Останні відгуки
            </h2>
            <div className="mt-[48px] hidden md:block">
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
          <div className="mb-10 block md:hidden">
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
              <div className="mt-[30px] flex w-full items-center">
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
                <Link href="/reviews" className="w-full">
                  <button
                    className={clsx(
                      'mt-[20px] h-[50px] w-full max-w-[345px]',
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
          <div
            className="w-full flex-1 overflow-hidden md:mt-0"
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onWheel={handleWheel}
          >
            <div className="flex gap-[30px] px-4 md:px-0">
              {reviewsData.map((review) => (
                <div
                  key={review.id}
                  className="h-[370px] w-full flex-shrink-0 rounded-lg bg-white p-[30px] shadow-md md:w-[450px]"
                >
                  <div className="flex items-center">
                    <div className="border-yellow relative h-[50px] w-[50px] rounded-full border">
                      <RegistrationIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="ml-[20px]">
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
                  <div className="custom-scrollbar h-[150px] overflow-y-auto">
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
            <div
              className="bg-grey-light relative mt-[30px] mb-[30px] hidden h-[6px] w-full md:block"
              ref={scrollbarRef}
            >
              <div
                className="border-grey-light absolute top-[-27px] flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full border bg-white shadow-md"
                ref={thumbRef}
                onMouseDown={handleThumbMouseDown}
              >
                <ArrowScrollIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[40px] flex flex-col items-center md:hidden">
        <div className="flex items-center gap-x-2.5">
          {reviewsData.map((_, index) => (
            <div
              key={index}
              className={clsx(
                'h-[15px] w-[15px] rounded-full',
                currentReview === index ? 'bg-yellow' : 'bg-grey-light',
              )}
              onClick={() => setCurrentReview(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
