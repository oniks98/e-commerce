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
