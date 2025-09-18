import { getTranslations } from 'next-intl/server';
import Hero from '@/components/shop/hero/hero';
import Categories from '@/components/shop/categories/categories';
import Products from '@/components/shop/products/products';

export default async function HomePage() {
  return (
    <div className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
        <Hero />
        <Categories />
        <Products />
      </div>
    </div>
  );
}
