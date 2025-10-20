import { setRequestLocale } from 'next-intl/server';

import Faq from '@/components/shop/catalog/faq';
import FilterableProducts from '@/components/shop/catalog/filterable-products';
import SeoText from '@/components/shop/catalog/seo-text';
import Subcategories from '@/components/shop/catalog/subcategories';
import Breadcrumbs from '@/components/shop/ui/breadcrumbs';
import Reviews from '@/components/shop/ui/reviews/reviews';

import { getCategoryBySlug } from '@/lib/shop/actions/category';
import {
  getProductCountByCategoryId,
  getProducts,
} from '@/lib/shop/actions/product';

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const awaitedParams = await params;
  setRequestLocale(awaitedParams.locale);
  const category = await getCategoryBySlug(awaitedParams.category);

  if (!category) {
    return <div>Category not found</div>;
  }

  const totalProducts = await getProductCountByCategoryId(category.id);
  const products = await getProducts({ categoryId: category.id });

  return (
    <section className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
        <Breadcrumbs category={category} />
        <Subcategories
          subcategories={category.children}
          categoryName={category.name}
          totalProducts={totalProducts}
        />
        <FilterableProducts
          initialProducts={products}
          locale={awaitedParams.locale}
        />
        <SeoText />
      </div>
      <Reviews />
      <div className="bg-white">
        <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
          <Faq />
        </div>
      </div>
    </section>
  );
}
