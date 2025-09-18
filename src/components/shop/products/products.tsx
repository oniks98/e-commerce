import { FC } from 'react';
import Link from 'next/link';

import { products } from '@/lib/shop/constants/products-data';
import ProductCard from './product-card';
import ArrowUpRightIcon from '@/lib/shop/icons/arrow-up-right-icon';
import ReloadIcon from '@/lib/shop/icons/reload-icon';

const Products: FC = () => {
  const productsToShow = products.slice(0, 8);

  return (
    <section className="bg-light w-full py-[35px]">
      <div className="mx-auto">
        <div className="mb-8 flex items-center">
          <h2 className="text-4xl font-semibold text-gray-900">
            Найпопулярніші товари
          </h2>
          <Link
            href="/catalog"
            className="ml-6 hidden items-center text-lg font-semibold text-yellow-500 md:flex"
          >
            Дивитись всі
            <ArrowUpRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-4">
          {productsToShow.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 flex justify-center md:hidden">
          <button className="flex items-center rounded-lg bg-yellow-500 px-5 py-3 text-lg font-semibold text-white">
            <ReloadIcon className="mr-2 h-6 w-6" />
            Показати ще товари
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
