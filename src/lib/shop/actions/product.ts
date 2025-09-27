import { createClient } from '@/lib/supabase/server';

export async function getProductBySku(sku: string) {
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('sku', sku)
    .single();

  if (error) {
    console.error(`Error fetching product with sku ${sku}:`, error);
    return null;
  }

  return product;
}
