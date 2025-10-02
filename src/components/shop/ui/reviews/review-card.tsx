'use client';

import Image from 'next/image';
import { getPlaceholder } from '@/lib/shop/media/cloudinary';
import { StarIcon, RegistrationIcon } from '@/lib/shop/icons';

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
    <div
      className={`${isMobile ? 'h-[370px] w-full' : 'h-[370px] w-[450px]'} flex-shrink-0 rounded-lg bg-white p-[30px] shadow-md`}
    >
      {/* Заголовок */}
      <div className="flex h-[70px] flex-shrink-0 items-center">
        <div className="border-yellow relative h-[50px] w-[50px] flex-shrink-0 rounded-full border">
          <RegistrationIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="ml-[20px] min-w-0 flex-1">
          <div className="flex items-start justify-between">
            <h4 className="text-dark truncate text-base font-normal">
              {review.author}
            </h4>
            <span className="text-grey ml-2 flex-shrink-0 text-base font-normal">
              {review.date}
            </span>
          </div>
          <div className="mt-[2px] flex">
            {Array.from({ length: review.rating }).map((_, index) => (
              <div
                key={index}
                className="text-yellow h-[24px] w-[24px] flex-shrink-0"
              >
                <StarIcon />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Текстовая область с кастомным скроллом */}
      <div className="custom-scrollbar mt-[30px] h-[150px] overflow-x-hidden overflow-y-auto">
        <p className="text-grey pr-2 text-left text-base leading-relaxed font-light break-words">
          {review.text}
        </p>
      </div>

      {/* Нижний блок */}
      <div className="mt-[30px] flex h-[50px] flex-shrink-0 items-center">
        <Image
          src={getPlaceholder('product', review.product.image)}
          alt={review.product.name}
          width={50}
          height={50}
          className="h-[50px] w-[50px] flex-shrink-0 rounded-full"
        />
        <span className="text-grey ml-[10px] truncate text-left text-lg font-semibold">
          {review.product.name}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
