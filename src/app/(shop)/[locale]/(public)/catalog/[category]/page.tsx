import { getCategoryBySlug } from '@/lib/shop/actions/category';
import { getProductCountByCategoryId } from '@/lib/shop/actions/product';
import Breadcrumbs from '@/components/shop/catalog/breadcrumbs';

import Subcategories from '@/components/shop/catalog/subcategories';
import SearchFilter from '@/components/shop/catalog/search-filter';
import Sorting from '@/components/shop/catalog/sorting';
import Products from '@/components/shop/catalog/products';
import BtnLoadMore from '@/components/ui/btn-load-more';
import Pagination from '@/components/shop/catalog/pagination';
import SeoText from '@/components/shop/catalog/seo-text';
import Reviews from '@/components/shop/reviews/reviews';
import Advantages from '@/components/ui/advantages';
import Faq from '@/components/shop/catalog/faq';

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const awaitedParams = await params;
  const category = await getCategoryBySlug(awaitedParams.category);

  if (!category) {
    return <div>Category not found</div>;
  }

  const totalProducts = await getProductCountByCategoryId(category.id);

  return (
    <div className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
        <Breadcrumbs category={category} />
        <Subcategories
          subcategories={category.children}
          categoryName={category.name}
          totalProducts={totalProducts}
        />
        <div className="flex gap-[30px] py-9">
          <SearchFilter />
          <div className="w-full">
            <Sorting />
            <Products />
            <div className="my-8 flex justify-center">
              <BtnLoadMore>Показати ще товари</BtnLoadMore>
            </div>
            <Pagination
              totalPages={18} // TODO: get total pages
            />
          </div>
        </div>
        <SeoText />
      </div>
      <Reviews />
      <div className="bg-white">
        <div className="mx-auto max-w-[1360px] px-4 pb-10 md:px-[35px]">
          <Faq />
          <Advantages />
        </div>
      </div>
    </div>
  );
}
