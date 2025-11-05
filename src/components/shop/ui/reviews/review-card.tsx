'use client';

import Image from 'next/image';

import { StarIcon, RegistrationIcon } from '@/lib/shop/icons';
import { getPlaceholder } from '@/lib/shop/media/cloudinary';

interface ReviewProduct {
  name: string;
  image: string;
}

interface ReviewData {
  id: number;
  author: string;
  date: string;
  rating: number;
  text: string;
  product: ReviewProduct;
}

interface ReviewCardProps {
  review: ReviewData;
  isMobile?: boolean;
}

const ReviewCard = ({ review, isMobile = false }: ReviewCardProps) => {
  return (
    <article
      className={`${isMobile ? 'h-[370px] w-full' : 'h-[370px] w-[450px]'} flex-shrink-0 rounded-lg bg-white p-[30px] shadow-md`}
    >
      {/* Header */}
      <header className="flex h-[70px] flex-shrink-0 items-center">
        <div className="border-sky relative h-[50px] w-[50px] flex-shrink-0 rounded-full border">
          <RegistrationIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="ml-[20px] min-w-0 flex-1">
          <div className="flex items-start justify-between">
            <h3 className="text-dark truncate text-base font-normal">
              {review.author}
            </h3>
            <time className="text-grey ml-2 flex-shrink-0 text-base font-normal">
              {review.date}
            </time>
          </div>
          <div
            className="mt-[2px] flex"
            role="img"
            aria-label={`Рейтинг: ${review.rating} з 5 зірок`}
          >
            {Array.from({ length: review.rating }).map((_, index) => (
              <div
                key={index}
                className="text-sky h-[24px] w-[24px] flex-shrink-0"
              >
                <StarIcon />
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Review text */}
      <div className="custom-scrollbar mt-[30px] h-[150px] overflow-x-hidden overflow-y-auto">
        <p className="text-grey pr-2 text-left text-base leading-relaxed font-light break-words">
          {review.text}
        </p>
      </div>

      {/* Product info */}
      <footer className="mt-[30px] flex h-[50px] flex-shrink-0 items-center">
        <Image
          src={'/images/logo.png'}
          alt={review.product.name}
          width={50}
          height={50}
          className="h-[50px] w-[50px] flex-shrink-0 rounded-full"
        />
        <span className="text-grey ml-[10px] truncate text-left text-lg font-semibold">
          {review.product.name}
        </span>
      </footer>
    </article>
  );
};

export default ReviewCard;
