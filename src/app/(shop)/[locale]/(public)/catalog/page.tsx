import Breadcrumbs from '@/components/shop/ui/breadcrumbs';
import {
  getAllCategories,
  type CategoryTreeItem,
} from '@/lib/shop/actions/category';
import { getProducts } from '@/lib/shop/actions/product';
import FilterableProducts from '@/components/shop/catalog/filterable-products';
import Categories from '@/components/shop/catalog/categories';
import Advantages from '@/components/shop/ui/advantages';

interface CategoryPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const awaitedParams = await params;
  const products = await getProducts({});

  const allCategoriesTree = await getAllCategories();

  const homeLabel = awaitedParams.locale === 'uk' ? 'Головна' : 'Home';
  const catalogLabel = awaitedParams.locale === 'uk' ? 'Каталог' : 'Catalog';

  const breadcrumbItems = [
    { label: homeLabel, href: `/${awaitedParams.locale}` },
    { label: catalogLabel, href: `/${awaitedParams.locale}/catalog` },
  ];

  return (
    <div className="bg-light">
      <div className="mx-auto mb-8 max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
        <Breadcrumbs items={breadcrumbItems} />
        <Categories
          locale={awaitedParams.locale}
          categories={allCategoriesTree}
        />
        <FilterableProducts
          initialProducts={products}
          locale={awaitedParams.locale}
        />
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
          <Advantages />
        </div>
      </div>
    </div>
  );
}
