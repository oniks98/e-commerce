import { getTranslations } from 'next-intl/server';
import Hero from '@/components/shop/home/hero/hero';
import Categories from '@/components/shop/home/categories/categories';
import Products from '@/components/shop/home/products/products';
import Promotions from '@/components/shop/home/promotions/promotions';
import About from '@/components/shop/home/about/about';
import Reviews from '@/components/shop/reviews/reviews';
import Articles from '@/components/shop/home/articles/articles';

import { getAllCategories } from '@/lib/shop/actions/category';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const catalogData = await getAllCategories();

  return (
    <div className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
        <Hero />
        <Categories locale={locale} catalogData={catalogData} />
        <Products />
        <Promotions />
      </div>
      <Reviews />
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
        <Articles />
      </div>
      <About />
    </div>
  );
}
