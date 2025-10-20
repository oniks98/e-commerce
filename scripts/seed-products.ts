/*
 * =====================================================================================
 *
 * To use this script, you need to:
 * 1. Make sure you have `ts-node` and `@supabase/supabase-js` installed:
 *    npm install -D ts-node @supabase/supabase-js
 * 2. Create a `.env` file in the root of your project.
 * 3. Add your Supabase URL and Service Role Key to the `.env` file:
 *    SUPABASE_URL=your_supabase_url
 *    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
 * 4. Run the script from the root of your project:
 *    npx ts-node --require dotenv/config scripts/seed-products.ts
 *
 * =====================================================================================
 */
import { createClient } from '@supabase/supabase-js';

const productsData = [
  { name: 'Система Умный дом Metaforsa 3', price: 1250 },
  {
    name: 'Розумний пристрій відкриття гаражних дверей Meross MSG100HK(EU)',
    price: 34.91,
  },
  {
    name: 'Розумний датчик температури та вологості з хабом Meross MS100FHHK-EU',
    price: 30.25,
  },
  {
    name: 'Комплект розумної димової сигналізації Meross GS559AHHK(EU)',
    price: 40.28,
  },
  {
    name: 'Розумний датчик температури та вологості Meross MS100FHK(EU)',
    price: 20.94,
  },
  {
    name: 'Смарт розетка вулична Merros MOP320HK-EU (сумісна з Matter)',
    price: 27.31,
  },
  { name: 'Розумний Wi-Fi Хаб Meross MSH300HK(EU)', price: 9.23 },
  { name: 'Розумний датчик витоку води Meross MS400HK-(EU)', price: 15.58 },
  {
    name: 'Розумний Wi-Fi термостат (тільки електричне опалення) Meross MTS200HK(EU)',
    price: 44.91,
  },
  { name: 'Розумна вулична Wi-Fi розетка Meross MSS620BNHK(EU)', price: 30.98 },
  { name: 'Розумна WiFi розетка (1 pack) Meross MSS210HK(EU)', price: 11.28 },
  {
    name: 'Розумний датчик відкриття двері або вікна Meross MS200HK(EU)',
    price: 11.1,
  },
  {
    name: 'Розумна настільна WiFi лампа Ambient Light Meross MSL450HK(EU)',
    price: 28.64,
  },
  { name: 'Розумна термоголовка Valve Meross MTS150HK(EU)', price: 36.49 },
  {
    name: 'Розумна настільна WiFi лампа Ambient Light Meross MSL430HK(EU)',
    price: 31.33,
  },
  { name: 'Розумний Wi-Fi дифузор Meross MOD150HK(EU)', price: 32.23 },
  {
    name: 'Розумний Wi-Fi термостат (тільки водяне опалення) Meross MTS200BHK(EU)',
    price: 44.91,
  },
  { name: 'Розумний підлоговий світильник Meross MSL610HK-(EU)', price: 57.3 },
  {
    name: 'Розумна настільна лампа Meross MSL430JHK-EU WiFi Ambient Light',
    price: 27.4,
  },
  {
    name: 'Розумний Wi-Fi Хаб Meross MSH450MA(EU) (сумісний з Matter)',
    price: 14.49,
  },
  { name: 'Розумне реле Meross MSS710HK-(UN)', price: 10.78 },
  { name: 'Розумний датчик присутності Meross MS600MA-(EU)', price: 28.66 },
  { name: 'Світлодіодна стрічка Meross MSL320HK(EU)-10M', price: 31.87 },
  {
    name: 'Смарт розетка Meross MSS315MA-(EU) (сумісна з Matter)',
    price: 11.28,
  },
  {
    name: 'Набір розумних WiFi розеток (2 pack) Meross MSS210HKKIT(EU)',
    price: 22,
  },
  {
    name: 'Розумна світлова LED стрічка Wi-Fi Meross MSL320PHK(EU)-5m-Light',
    price: 25.48,
  },
  {
    name: 'Розумний подовжувач живлення Wi-Fi Meross MSS425FHK(EU)',
    price: 34.02,
  },
  {
    name: 'Розумний пристрій відкриття гаражних дверей (на 3 двері) Meross MSG200HK(EU)',
    price: 45.66,
  },
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase URL and service role key must be provided in your .env file.',
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

async function seedData() {
  console.log('Starting to seed product data...');

  // Get the category to assign to the products
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'obladnannya-dlya-sistemi-rozumnij-budinok')
    .single();

  if (categoryError || !category) {
    console.error('Error fetching category:', categoryError);
    return;
  }

  const categoryId = category.id;

  // 1. Clean slate: Delete all existing products
  console.log('Deleting existing products...');
  const { error: deleteError } = await supabase
    .from('products')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Dummy condition to delete all

  if (deleteError) {
    console.error('Error deleting products:', deleteError);
    return;
  }
  console.log('Existing products deleted.');

  // 2. Insert products
  console.log('Inserting products...');
  for (const product of productsData) {
    const slug = slugify(product.name);
    const sku = `${slug.substring(0, 15)}-${Math.random().toString(36).substring(2, 7)}`;

    const { data, error } = await supabase
      .from('products')
      .insert({
        name: { uk: product.name, en: product.name },
        price_uah: product.price,
        price_usd: 0,
        price_eur: 0,
        vat_rate: 0,
        sku: sku,
        slug: slug,
        category_id: categoryId,
      })
      .select('id')
      .single();

    if (error) {
      console.error(`Error inserting product "${product.name}":`, error);
      continue;
    }

    if (data) {
      console.log(`Inserted "${product.name}" with new ID: ${data.id}`);
    }
  }
  console.log('Products inserted.');
  console.log('Seeding complete!');
}

seedData().catch(console.error);
