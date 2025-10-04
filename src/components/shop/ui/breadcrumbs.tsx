'use server';

import Link from 'next/link';

import RightArrowIcon from '@/lib/shop/icons/right-arrow-icon';
import { getProductBySku } from '@/lib/shop/actions/product';
import {
  getCategoryBySlug,
  getCategoryPath,
} from '@/lib/shop/actions/category';

type BreadcrumbsProps = {
  product?: Awaited<ReturnType<typeof getProductBySku>>;
  category?: Awaited<ReturnType<typeof getCategoryBySlug>>;
};

const Breadcrumbs = async ({
  product,
  category: categoryProp,
}: BreadcrumbsProps) => {
  let categoryPath: Array<{ id: string; name: string; slug: string }> = [];
  let productName: string | undefined;

  if (product) {
    // Get full category path for product
    if (product.category_id) {
      categoryPath = await getCategoryPath(product.category_id);
    }
    productName =
      typeof product.name === 'object' && product.name
        ? (product.name as any)['uk'] || 'Unnamed Product'
        : 'Unnamed Product';
  } else if (categoryProp) {
    // Get full category path for category page
    categoryPath = await getCategoryPath(categoryProp.id);
  }

  return (
    <nav className="text-grey flex flex-wrap items-center gap-y-2 py-1 text-base font-normal">
      <Link
        href="/"
        className="text-grey hover:text-yellow-dark transition-colors"
      >
        Головна
      </Link>

      {categoryPath.map((cat, index) => {
        const isLast = index === categoryPath.length - 1 && !productName;

        return (
          <div key={cat.id} className="flex items-center">
            <span className="mx-2">
              <RightArrowIcon />
            </span>
            {isLast ? (
              <span className="text-yellow font-medium">{cat.name}</span>
            ) : (
              <Link
                href={`/catalog/${cat.slug}`}
                className="text-grey hover:text-yellow-dark transition-colors"
              >
                {cat.name}
              </Link>
            )}
          </div>
        );
      })}

      {productName && (
        <div className="flex items-center">
          <span className="mx-2">
            <RightArrowIcon />
          </span>
          <span className="text-yellow font-medium">{productName}</span>
        </div>
      )}
    </nav>
  );
};

export default Breadcrumbs;
