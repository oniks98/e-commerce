import Link from 'next/link';

import clsx from 'clsx';

import { getLocalizedValue } from '@/i18n/localized-content';
import { Locale } from '@/i18n/types';

import {
  getCategoryBySlug,
  getCategoryPath,
} from '@/lib/shop/actions/category';
import { getProductBySku } from '@/lib/shop/actions/product';
import { RightArrowIcon } from '@/lib/shop/icons';

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
  className?: string;
};

const Breadcrumbs = async ({
  product,
  category: categoryProp,
  items,
  locale = 'uk',
  className,
}: BreadcrumbsProps) => {
  if (items) {
    return (
      <nav
        className={clsx(
          'text-grey flex flex-wrap items-center gap-y-2 py-1 text-base font-normal',
          className,
        )}
      >
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
                <span className="text-sky font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-grey hover:text-sky-dark transition-colors"
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
    productName = getLocalizedValue(product.name, locale, 'Unnamed Product');
  } else if (categoryProp) {
    // Get full category path for category page
    categoryPath = await getCategoryPath(categoryProp.id);
  }

  const homeLabel = locale === 'uk' ? 'Головна' : 'Home';

  return (
    <nav
      className={clsx(
        'text-grey flex flex-wrap items-center gap-y-2 py-1 text-base font-normal',
        className,
      )}
    >
      <Link
        href={`/${locale}`}
        className="text-grey hover:text-sky-dark transition-colors"
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
              <span className="text-sky font-medium">{cat.name}</span>
            ) : (
              <Link
                href={`/${locale}/catalog/${cat.slug}`}
                className="text-grey hover:text-sky-dark transition-colors"
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
          <span className="text-sky font-medium">{productName}</span>
        </div>
      )}
    </nav>
  );
};

export default Breadcrumbs;
