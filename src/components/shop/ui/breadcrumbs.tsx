import Link from 'next/link';

import RightArrowIcon from '@/lib/shop/icons/right-arrow-icon';
import { getProductBySku } from '@/lib/shop/actions/product';
import {
  getCategoryBySlug,
  getCategoryPath,
} from '@/lib/shop/actions/category';
import { Locale } from '@/i18n/types';

type BreadcrumbItem = {
  label: string;
  href: string;
  active?: boolean;
};

type BreadcrumbsProps = {
  product?: Awaited<ReturnType<typeof getProductBySku>>;
  category?: Awaited<ReturnType<typeof getCategoryBySlug>>;
  items?: BreadcrumbItem[];
  locale?: Locale;
};

const Breadcrumbs = async ({
  product,
  category: categoryProp,
  items,
  locale = 'uk',
}: BreadcrumbsProps) => {
  if (items) {
    return (
      <nav className="text-grey flex flex-wrap items-center gap-y-2 py-1 text-base font-normal">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={item.href} className="flex items-center">
              {index > 0 && (
                <span className="mx-2">
                  <RightArrowIcon />
                </span>
              )}
              {isLast ? (
                <span className="text-yellow font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-grey hover:text-yellow-dark transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    );
  }

  let categoryPath: Array<{ id: string; name: string; slug: string }> = [];
  let productName: string | undefined;

  if (product) {
    // Get full category path for product
    if (product.category_id) {
      categoryPath = await getCategoryPath(product.category_id);
    }
    productName =
      typeof product.name === 'object' && product.name
        ? (product.name as any)[locale] || 'Unnamed Product'
        : 'Unnamed Product';
  } else if (categoryProp) {
    // Get full category path for category page
    categoryPath = await getCategoryPath(categoryProp.id);
  }

  const homeLabel = locale === 'uk' ? 'Головна' : 'Home';

  return (
    <nav className="text-grey flex flex-wrap items-center gap-y-2 py-1 text-base font-normal">
      <Link
        href={`/${locale}`}
        className="text-grey hover:text-yellow-dark transition-colors"
      >
        {homeLabel}
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
                href={`/${locale}/catalog/${cat.slug}`}
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
