'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import { CategoryTreeItem } from '@/lib/shop/actions/category';
import { ArrowUpRightIcon } from '@/lib/shop/icons';
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Запускаем анимацию появления после монтирования компонента
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-8">
      <div className="mb-3 flex items-center gap-3 pr-5 pl-5">
        <h1 className="text-dark text-3xl font-semibold">{categoryName}</h1>
        <div className="text-grey text-lg">{totalProducts} товарів</div>
      </div>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-500 ease-in-out',
          // Одинаковая анимация для всех случаев
          isInitialLoad || isHidden
            ? 'max-h-0 opacity-0'
            : 'max-h-[2000px] opacity-100',
        )}
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-7 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subcategories.map((subcategory) => (
            <Link key={subcategory.id} href={`/catalog/${subcategory.slug}`}>
              <div className="group relative h-[240px] w-full overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105 md:h-[300px]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${getPlaceholder(
                      'category',
                      subcategory.id,
                    )})`,
                  }}
                />
                <div className="bg-opacity-20 bg-light absolute inset-0" />

                {/* Контент карточки */}
                <div className="text-dark relative z-10 flex h-full flex-col p-4 md:p-5">
                  {/* Верхняя часть с названием */}
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl leading-[1.4] font-semibold">
                      {subcategory.name}
                    </h3>
                  </div>

                  {/* Нижняя часть с иконкой */}
                  <div className="mt-auto flex justify-end">
                    <div
                      className={clsx(
                        'border-yellow flex items-center justify-center rounded-full border-2',
                        'h-10 w-10 md:h-12 md:w-12',
                      )}
                    >
                      <ArrowUpRightIcon
                        className={clsx('text-yellow h-3 w-3 md:h-4 md:w-4')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
