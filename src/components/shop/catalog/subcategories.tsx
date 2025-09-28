'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import { CategoryTreeItem } from '@/lib/shop/actions/category';
import AngleDoubleUpIcon from '@/lib/shop/icons/angle-double-up-icon';
import { getPlaceholder } from '@/lib/shop/media/cloudinary';

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
              <div className="bg-yellow-dark absolute top-0 left-1/2 h-1.5 w-5 -translate-x-1/2 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              <Image
                src={getPlaceholder('category', subcategory.id)}
                alt={subcategory.name}
                width={250}
                height={180}
                className="h-full w-full object-cover"
              />
              <div className="bg-opacity-20 bg-dark absolute inset-0 flex items-start justify-start p-4">
                <h3 className="pt-2 pl-2 text-left text-lg font-semibold text-white">
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
          className="text-yellow hover:text-yellow-dark flex items-center text-lg transition-colors"
        >
          <span className="mr-2">
            {isHidden ? 'Показати' : 'Приховати'} підкатегорії
          </span>
          <AngleDoubleUpIcon
            className={clsx('transition-transform', isHidden && 'rotate-180')}
          />
        </button>
      </div>
    </section>
  );
};

export default Subcategories;
