'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import { CategoryTreeItem } from '@/lib/shop/actions/category';
import AngleDoubleUpIcon from '@/lib/shop/icons/angle-double-up-icon';

interface SubcategoriesProps {
  subcategories: CategoryTreeItem[];
  categoryName: string;
  totalProducts: number;
}

const Subcategories = ({
  subcategories,
  categoryName,
  totalProducts,
}: SubcategoriesProps) => {
  const [isHidden, setIsHidden] = useState(false);

  const subcategoryImages: { [key: string]: string } = {
    'promo-beds': '/images/promo-beds.png',
    'beds-with-lifting-mechanism': '/images/beds-with-lifting-mechanism.png',
    'children-beds': '/images/children-beds.png',
    'podium-beds': '/images/podium-beds.png',
    'soft-beds': '/images/soft-beds.png',
    'metal-beds': '/images/metal-beds.png',
    'wooden-beds': '/images/wooden-beds.png',
    'sofa-beds': '/images/sofa-beds.png',
    'double-beds': '/images/double-beds.png',
    'single-beds': '/images/single-beds.png',
  };

  return (
    <section className="py-8">
      <div className="mb-8 flex items-center gap-3">
        <h1 className="text-dark text-3xl font-semibold">{categoryName}</h1>
        <div className="text-grey text-lg">{totalProducts} товарів</div>
      </div>
      {!isHidden && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {subcategories.map((subcategory) => (
            <Link
              key={subcategory.id}
              href={`/catalog/${subcategory.slug}`}
              className="group relative block overflow-hidden rounded-lg"
            >
              <div className="absolute top-0 left-1/2 h-1.5 w-5 -translate-x-1/2 scale-x-0 bg-yellow-500 transition-transform duration-300 group-hover:scale-x-100"></div>
              <Image
                src={
                  subcategoryImages[subcategory.slug] ||
                  '/images/default-subcategory.png'
                }
                alt={subcategory.name}
                width={250}
                height={180}
                className="h-full w-full object-cover"
              />
              <div className="bg-opacity-20 bg-dark absolute inset-0 flex items-center justify-center p-4">
                <h3 className="text-center text-lg font-semibold text-white">
                  {subcategory.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setIsHidden(!isHidden)}
          className="flex items-center text-lg text-yellow-500 transition-colors hover:text-yellow-600"
        >
          <span className="mr-2">
            {isHidden ? 'Показати' : 'Приховати'} підкатегорії
          </span>
          <AngleDoubleUpIcon />
        </button>
      </div>
    </section>
  );
};

export default Subcategories;
