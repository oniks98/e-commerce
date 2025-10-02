'use client';

import Link from 'next/link';
import ProductCard from '@/components/shop/ui/product-card';
import { ArrowUpRightIcon } from '@/lib/shop/icons';
import BtnLoadMore from '@/components/shop/ui/btn-load-more';
import { Tables } from '@/lib/supabase/types/database';

type Product = Tables<'products'>;

interface ProductsProps {
  products: Product[];
  locale: string;
}

const Products = ({ products, locale }: ProductsProps) => {
  return (
    <section className="bg-light w-full py-[35px]">
      <div className="mx-auto">
        <div className="mb-8 flex items-center">
          <h2 className="text-dark text-3xl font-semibold">
            Найпопулярніші товари
          </h2>
          <Link
            href="/catalog"
            className="text-yellow-dark ml-6 hidden items-center text-lg font-semibold md:flex"
          >
            Дивитись всі
            <ArrowUpRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-7">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
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
