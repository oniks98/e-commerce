import { type LocalizedJson } from '@/i18n/localized-content';

import { type Tables } from '@/lib/supabase/types/database';

/**
 * Product type from Supabase with proper typing for localized fields
 */
export type Product = Tables<'products'>;

/**
 * Category type from Supabase with proper typing for localized fields
 */
export type Category = Tables<'categories'>;

/**
 * Product with category relation
 */
export type ProductWithCategory = Product & {
  categories:
    | (Category & {
        parent: Category | null;
      })
    | null;
};

/**
 * Type assertion helper for localized JSON fields
 * Use this when you're certain the field is LocalizedJson
 */
export function asLocalizedJson(value: unknown): LocalizedJson {
  return value as LocalizedJson;
}
