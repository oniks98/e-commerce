import { setRequestLocale } from 'next-intl/server';

import About from '@/components/shop/home/about';
import Articles from '@/components/shop/home/articles';
import Categories from '@/components/shop/home/categories';
import Hero from '@/components/shop/home/hero';
import Products from '@/components/shop/home/products';
import Promotions from '@/components/shop/home/promotions';
import Reviews from '@/components/shop/ui/reviews/reviews';

import { getAllCategories } from '@/lib/shop/actions/category';
import {
  getProductCountByCategoryId,
  getProducts,
} from '@/lib/shop/actions/product';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const catalogData = await getAllCategories();
  const products = await getProducts({ limit: 8 });

  // getAllCategories returns only root categories (those without parent_id)
  // as the tree structure already filters them
  const catalogDataWithProductCount = await Promise.all(
    catalogData.map(async (category) => {
      const count = await getProductCountByCategoryId(category.id);
      return { ...category, productCount: count };
    }),
  );

  return (
    <div className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
        <Hero />
        <Categories locale={locale} catalogData={catalogDataWithProductCount} />
        <Products products={products} locale={locale} />
        <Promotions />
      </div>
      <Reviews />
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
        <Articles locale={locale} />
        <About />
      </div>
    </div>
  );
}
