import Link from 'next/link';
import clsx from 'clsx';

import { catalogData } from '@/lib/shop/constants/catalog-data';
import { getPlaceholder } from '@/lib/shop/media/cloudinary';
import { ArrowUpRightIcon } from '@/lib/shop/icons';

const Categories = () => {
  const categories = catalogData.slice(0, 12);

  return (
    <section className="py-[35px]">
      <div className="mx-auto">
        <h1 className="mb-[35px] text-left text-3xl font-semibold md:text-4xl">
          Популярні категорії
        </h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-4">
          {categories.map((category, index) => (
            <Link href={category.href} key={category.id}>
              <div className="group relative h-[240px] w-full overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105 md:h-[300px]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${getPlaceholder(
                      'category',
                      `v162930289${index}`,
                    )})`,
                  }}
                />
                <div className="bg-opacity-20 bg-light absolute inset-0" />

                {/* Контент карточки */}
                <div className="relative z-10 flex h-full flex-col p-4 text-black md:p-5">
                  {/* Верхняя часть с названием и количеством */}
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl leading-[1.4] font-semibold">
                      {category.name}
                    </h2>
                    <span className="ml-2 flex-shrink-0 text-sm text-gray-300 md:text-base">
                      {Math.floor(Math.random() * 100) + 10}
                    </span>
                  </div>

                  {/* Нижняя часть с иконкой */}
                  <div className="mt-auto flex justify-end">
                    <div
                      className={clsx(
                        'flex items-center justify-center rounded-full border-2 border-yellow-400',
                        'h-10 w-10 md:h-12 md:w-12',
                      )}
                    >
                      <ArrowUpRightIcon
                        className={clsx(
                          'h-3 w-3 text-yellow-400 md:h-4 md:w-4',
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
