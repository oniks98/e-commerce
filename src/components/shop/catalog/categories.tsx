'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { CategoryTreeItem } from '@/lib/shop/actions/category';
import { AngleDoubleUpIcon } from '@/lib/shop/icons';

import { CategoryCard, CategoryWithCount } from './category-card';

interface CategoriesProps {
  categories: CategoryWithCount[];
  locale: string;
}

const Categories = ({ categories, locale }: CategoriesProps) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <section className="py-[35px]">
      <div className="mx-auto">
        <h1 className="mb-[35px] text-left text-4xl font-semibold">
          Категорії товарів
        </h1>
        <div
          className={clsx(
            'grid transition-all duration-500 ease-in-out',
            isHidden ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
          )}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-7 py-4">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  locale={locale}
                  isPriority={index < 4}
                />
              ))}
            </div>
          </div>
        </div>
        {categories && categories.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsHidden(!isHidden)}
              className="text-sky hover:text-sky-dark flex items-center text-lg transition-colors"
            >
              <span className="mr-2">
                {isHidden ? 'Показати' : 'Приховати'} категорії
              </span>
              <AngleDoubleUpIcon
                className={clsx(
                  'transition-transform duration-300',
                  isHidden && 'rotate-180',
                )}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
