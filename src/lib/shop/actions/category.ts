import { createClient } from '@/lib/supabase/server';

import { getProductCountByCategoryId } from './product';

// This is the type for the hierarchical structure
export interface CategoryTreeItem {
  id: string;
  name: string;
  slug: string;
  image_url?: string | null;
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
    .select('id, name, slug, parent_id, image_url, sort_order')
    .order('sort_order');

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
      image_url: category.image_url,
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
    .select('id, name, slug, image_url, sort_order')
    .eq('parent_id', category.id)
    .order('sort_order');

  if (childrenError) {
    console.error(
      `Error fetching children for category ${category.name}:`,
      childrenError,
    );
    // Return the category even if children fetch fails
    return { ...category, children: [] };
  }

  const childrenWithProductCount = await Promise.all(
    (children || []).map(async (child) => {
      const count = await getProductCountByCategoryId(child.id);
      return { ...child, productCount: count };
    }),
  );

  return { ...category, children: childrenWithProductCount };
}

export async function getDescendantCategoryIds(
  categoryId: string,
): Promise<string[]> {
  const supabase = await createClient();

  const { data: allCategories, error: fetchError } = await supabase
    .from('categories')
    .select('id, parent_id');

  if (fetchError) {
    console.error('Error fetching categories:', fetchError);
    return [categoryId];
  }

  const categoryMap = new Map<string, string[]>();
  allCategories.forEach((c) => {
    if (c.parent_id) {
      if (!categoryMap.has(c.parent_id)) {
        categoryMap.set(c.parent_id, []);
      }
      categoryMap.get(c.parent_id)!.push(c.id);
    }
  });

  const result: string[] = [categoryId];
  const queue: string[] = [categoryId];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const children = categoryMap.get(currentId);
    if (children) {
      result.push(...children);
      queue.push(...children);
    }
  }

  return result;
}

/**
 * Gets the full breadcrumb path from root category to the given category
 * Returns array of categories in order: [root, parent, ..., current]
 */
export async function getCategoryPath(categoryId: string) {
  const supabase = await createClient();
  const path: Array<{ id: string; name: string; slug: string }> = [];

  let currentId: string | null = categoryId;

  while (currentId) {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug, parent_id')
      .eq('id', currentId)
      .single();

    if (error || !data) {
      console.error('Error fetching category path:', error);
      break;
    }
    const category: {
      id: string;
      name: string;
      slug: string;
      parent_id: string | null;
    } = data;

    path.unshift({
      id: category.id,
      name: category.name,
      slug: category.slug,
    });

    currentId = category.parent_id;
  }

  return path;
}
