// scripts/seed-slugs.ts
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import slugify from 'slugify';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function seedSlugs() {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name');

  if (error) {
    console.error('Error fetching categories:', error);
    return;
  }

  if (!categories) {
    return;
  }

  for (const category of categories) {
    const slug = slugify(category.name, { lower: true, strict: true });
    const { error: updateError } = await supabase
      .from('categories')
      .update({ slug })
      .eq('id', category.id);

    if (updateError) {
      console.error(
        `Error updating slug for category ${category.id}:`,
        updateError,
      );
    } else {
      console.log(
        `Successfully updated slug for category ${category.id} to "${slug}"`,
      );
    }
  }
}

seedSlugs();
