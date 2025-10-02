import Link from 'next/link';

import RightArrowIcon from '@/lib/shop/icons/right-arrow-icon';
import { getProductBySku } from '@/lib/shop/actions/product';
import { getCategoryBySlug } from '@/lib/shop/actions/category';
import { createClient } from '@/lib/supabase/server';

type BreadcrumbsProps = {
  product?: Awaited<ReturnType<typeof getProductBySku>>;
  category?: Awaited<ReturnType<typeof getCategoryBySlug>>;
};

async function getParentCategory(parentId: string | null) {
  if (!parentId) return null;
  const supabase = await createClient();
  const { data: parent } = await supabase
    .from('categories')
    .select('name, slug')
    .eq('id', parentId)
    .single();
  return parent;
}

const Breadcrumbs = async ({
  product,
  category: categoryProp,
}: BreadcrumbsProps) => {
  let categoryForPath;
  let parentCategoryForPath;
  let productName;

  if (product) {
    categoryForPath = product.categories;
    parentCategoryForPath = Array.isArray(product.categories?.parent)
      ? product.categories?.parent[0]
      : product.categories?.parent;
    productName = product.name['uk']; // Assuming 'uk' locale
  } else if (categoryProp) {
    categoryForPath = categoryProp;
    parentCategoryForPath = await getParentCategory(categoryProp.parent_id);
  }

  return (
    <nav className="text-grey flex items-center py-1 text-base font-normal">
      <Link href="/" className="text-grey hover:text-yellow-dark">
        Головна
      </Link>
      {parentCategoryForPath && (
        <>
          <span className="mx-2">
            <RightArrowIcon />
          </span>
          <Link
            href={`/catalog/${parentCategoryForPath.slug}`}
            className="text-grey hover:text-yellow-dark"
          >
            {parentCategoryForPath.name}
          </Link>
        </>
      )}
      {categoryForPath && (
        <>
          <span className="mx-2">
            <RightArrowIcon />
          </span>
          {productName ? (
            <Link
              href={`/catalog/${categoryForPath.slug}`}
              className="text-grey hover:text-yellow-dark"
            >
              {categoryForPath.name}
            </Link>
          ) : (
            <span className="text-yellow">{categoryForPath.name}</span>
          )}
        </>
      )}
      {productName && (
        <>
          <span className="mx-2">
            <RightArrowIcon />
          </span>
          <span className="text-yellow">{productName}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
