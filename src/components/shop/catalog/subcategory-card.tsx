'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { CategoryTreeItem } from '@/lib/shop/actions/category';
import { ArrowUpRightIcon } from '@/lib/shop/icons';

export interface SubcategoryWithCount extends CategoryTreeItem {
  productCount: number;
}

export function SubcategoryCard({
  subcategory,
  isPriority,
}: {
  subcategory: SubcategoryWithCount;
  isPriority: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(
    subcategory.image_url || '/images/logo.png',
  );
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      console.error(`Failed to load image for category: ${subcategory.name}`);
      console.error(`Image URL was: ${imgSrc}`);
      setHasError(true);
      setImgSrc('/images/logo.png');
    }
  };

  return (
    <Link href={`/catalog/${subcategory.slug}`} className="group flex flex-col">
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <div className="relative h-[280px] w-full md:h-[320px]">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={subcategory.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={isPriority}
              onError={handleError}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <span className="text-gray-400">Немає зображення</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-dark flex-grow text-lg font-semibold">
            {subcategory.name}
          </h3>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-grey">
              {subcategory.productCount} товарів
            </span>
            <ArrowUpRightIcon className="text-yellow h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
          </div>
        </div>
      </div>
    </Link>
  );
}
