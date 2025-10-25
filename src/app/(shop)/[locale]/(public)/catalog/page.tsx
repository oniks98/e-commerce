import { setRequestLocale } from 'next-intl/server';

import Categories from '@/components/shop/catalog/categories';
import FilterableProducts from '@/components/shop/catalog/filterable-products';
import Breadcrumbs from '@/components/shop/ui/breadcrumbs';

import {
  getAllCategories,
  type CategoryTreeItem,
} from '@/lib/shop/actions/category';
import {
  getProducts,
  getProductCountByCategoryId,
} from '@/lib/shop/actions/product';

interface CategoryPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const awaitedParams = await params;
  setRequestLocale(awaitedParams.locale);
  const products = await getProducts({});

  const allCategoriesTree = await getAllCategories();

  const categoriesWithProductCount = await Promise.all(
    allCategoriesTree.map(async (category) => {
      const count = await getProductCountByCategoryId(category.id);
      return { ...category, productCount: count };
    }),
  );

  const homeLabel = awaitedParams.locale === 'uk' ? 'Головна' : 'Home';
  const catalogLabel = awaitedParams.locale === 'uk' ? 'Каталог' : 'Catalog';

  const breadcrumbItems = [
    { label: homeLabel, href: `/${awaitedParams.locale}` },
    { label: catalogLabel, href: `/${awaitedParams.locale}/catalog` },
  ];

  return (
    <section className="bg-light">
      <div className="mx-auto mb-8 max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
        <Breadcrumbs items={breadcrumbItems} />
        <Categories
          locale={awaitedParams.locale}
          categories={categoriesWithProductCount}
        />
        <FilterableProducts
          initialProducts={products}
          locale={awaitedParams.locale}
        />
      </div>
    </section>
  );
}
