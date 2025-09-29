import { createClient } from '@/lib/supabase/server';
import { getDescendantCategoryIds } from './category';

export async function getProductBySku(sku: string) {
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from('products')
    .select(
      `
      *,
      categories (
        id,
        name,
        slug,
        parent_id,
        parent:categories (id, name, slug)
      )
    `,
    )
    .eq('sku', sku)
    .single();

  if (error) {
    console.error(`Error fetching product with sku ${sku}:`, error);
    return null;
  }

  return product;
}

export async function getProductCountByCategoryId(
  categoryId: string,
): Promise<number> {
  const supabase = await createClient();
  const categoryIds = await getDescendantCategoryIds(categoryId);

  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .in('category_id', categoryIds);

  if (error) {
    console.error('Error fetching product count:', error);
    return 0;
  }

  return count || 0;
}

export async function getProducts(options: {
  categoryId?: string;
  limit?: number;
}) {
  const supabase = await createClient();
  let query = supabase.from('products').select('*');

  if (options.categoryId) {
    const categoryIds = await getDescendantCategoryIds(options.categoryId);
    query = query.in('category_id', categoryIds);
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data: products, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return products;
}
