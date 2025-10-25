'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { AngleDoubleUpIcon } from '@/lib/shop/icons';

import { SubcategoryCard, SubcategoryWithCount } from './subcategory-card';

interface SubcategoriesProps {
  subcategories: SubcategoryWithCount[];
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
      <div className="mb-8 flex justify-center gap-3 pr-5 pl-5 md:justify-start">
        <h1 className="text-dark text-4xl font-semibold">{categoryName}</h1>
        <div className="text-grey text-lg">{totalProducts} товарів</div>
      </div>
      <div
        className={clsx(
          'grid transition-all duration-500 ease-in-out',
          isHidden ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="grid [grid-template-columns:repeat(auto-fill,291px)] justify-center gap-7 px-5 pb-3 md:justify-start">
            {subcategories.map((subcategory, index) => (
              <SubcategoryCard
                key={subcategory.id}
                subcategory={subcategory}
                isPriority={index < 4} // Example priority logic
              />
            ))}
          </div>
        </div>
      </div>
      {subcategories && subcategories.length > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsHidden(!isHidden)}
            className="text-yellow hover:text-yellow-dark flex items-center text-lg transition-colors"
          >
            <span className="mr-2">
              {isHidden ? 'Показати' : 'Приховати'} підкатегорії
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
    </section>
  );
};

export default Subcategories;
