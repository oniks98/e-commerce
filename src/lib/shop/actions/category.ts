import { createClient } from '@/lib/supabase/server';

// This is the type for the hierarchical structure
export interface CategoryTreeItem {
  id: string;
  name: string;
  slug: string;
  children: CategoryTreeItem[];
}

/**
 * Fetches all categories and organizes them into a hierarchical tree structure.
 * Used for building navigation menus.
 */
export async function getAllCategories(): Promise<CategoryTreeItem[]> {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, slug, parent_id');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  if (!categories) {
    return [];
  }

  const categoryMap = new Map<string, CategoryTreeItem>();
  const rootCategories: CategoryTreeItem[] = [];

  // First pass: create a map of all categories
  categories.forEach((category) => {
    categoryMap.set(category.id, {
      id: category.id,
      name: category.name,
      slug: category.slug,
      children: [],
    });
  });

  // Second pass: build the hierarchy
  categories.forEach((category) => {
    if (category.parent_id && categoryMap.has(category.parent_id)) {
      const parent = categoryMap.get(category.parent_id);
      const current = categoryMap.get(category.id);
      if (parent && current) {
        parent.children.push(current);
      }
    } else {
      const current = categoryMap.get(category.id);
      if (current) {
        rootCategories.push(current);
      }
    }
  });

  return rootCategories;
}

/**
 * Fetches a single category by its slug, including its direct children.
 * Used for category-specific pages.
 */
export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient();

  // Fetch the category itself
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (categoryError || !category) {
    console.error(`Error fetching category for slug ${slug}:`, categoryError);
    return null;
  }

  // Fetch its direct children (subcategories)
  const { data: children, error: childrenError } = await supabase
    .from('categories')
    .select('id, name, slug')
    .eq('parent_id', category.id);

  if (childrenError) {
    console.error(
      `Error fetching children for category ${category.name}:`,
      childrenError,
    );
    // Return the category even if children fetch fails
    return { ...category, children: [] };
  }

  return { ...category, children: children || [] };
}
