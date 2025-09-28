'use client';

import Link from 'next/link';
import { products } from '@/lib/shop/constants/products-data';
import ProductCard from '@/components/ui/product-card';
import { ArrowUpRightIcon } from '@/lib/shop/icons';
import BtnLoadMore from '@/components/ui/btn-load-more';

const Products = () => {
  const productsToShow = products.slice(0, 8);

  return (
    <section className="bg-light w-full py-[35px]">
      <div className="mx-auto">
        <div className="mb-8 flex items-center">
          <h2 className="text-dark text-3xl font-semibold">
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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-7">
          {productsToShow.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 flex justify-center md:hidden">
          <BtnLoadMore onClick={() => alert('TODO: Load more products')}>
            Показати ще товари
          </BtnLoadMore>
        </div>
      </div>
    </section>
  );
};

export default Products;
