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
 *    npx ts-node --require dotenv/config scripts/seed-categories.ts
 *
 * =====================================================================================
 */

import { createClient } from '@supabase/supabase-js';

// Data copied from src/lib/shop/constants/catalog-data.ts
const catalogData = [
  {
    id: 'sistema-rozumnij-budinok',
    name: 'Система Розумний будинок',
    subcategories: [
      {
        id: 'obladnannya-dlya-sistemi-rozumnij-budinok',
        name: 'Обладнання для системи Розумний будинок',
      },
      {
        id: 'ustanovka-sistemi-rozumnij-budinok',
        name: 'Установка системи Розумний будинок',
      },
      {
        id: 'sistema-rozumnij-budinok-dlya-zhitlovih-kompleksiv',
        name: 'Система Розумний будинок для житлових комплексів',
      },
    ],
  },
  {
    id: 'videosposterezhennya',
    name: 'Відеоспостереження',
    subcategories: [
      {
        id: 'videokameri-dlya-videosposterezhennya',
        name: 'Відеокамери для відеоспостереження',
      },
      {
        id: 'videoreyestratori',
        name: 'Відеореєстратори',
      },
      {
        id: 'nakopichuvachi-dlya-videosposterezhennya',
        name: 'Накопичувачі для відеоспостереження',
      },
      {
        id: 'komplektuyuchi-dlya-videosposterezhennya',
        name: 'Комплектуючі для відеоспостереження',
      },
    ],
  },
  {
    id: 'domofoni',
    name: 'Домофони',
    subcategories: [
      {
        id: 'videodomofoni',
        name: 'Відеодомофони',
      },
      {
        id: 'viklichni-videopaneli',
        name: 'Викличні відеопанелі',
      },
      {
        id: 'peregovorni-pristroyi',
        name: 'Переговорні пристрої',
      },
      {
        id: 'komplektuyuchi-dlya-domofoniv',
        name: 'Комплектуючі для домофонів',
      },
    ],
  },
  {
    id: 'teplovizori-ratsiyi-droni',
    name: 'Тепловізори, рації, дрони',
    subcategories: [
      {
        id: 'teplovizori',
        name: 'Тепловізори',
      },
      {
        id: 'ratsiyi',
        name: 'Рації',
      },
      {
        id: 'droni',
        name: 'Дрони',
      },
    ],
  },
  {
    id: 'ohoronno-pozhezhna-signalizatsiya',
    name: 'Охоронно-пожежна сигналізація',
    subcategories: [
      {
        id: 'signalizatsiya-lun',
        name: 'Сигналізація Лунь',
      },
      {
        id: 'signalizatsiya-ajax',
        name: 'Сигналізація Ajax',
      },
      {
        id: 'signalizatsiya-dahua-technology',
        name: 'Сигналізація Dahua Technology',
      },
      {
        id: 'signalizatsiya-hikvision',
        name: 'Сигналізація Hikvision',
      },
      {
        id: 'komplektuyuchi-dlya-signalizatsiyi',
        name: 'Комплектуючі для сигналізації',
      },
    ],
  },
  {
    id: 'sistemi-kontrolyu-dostupu-i-obliku-robochogo-chasu',
    name: 'Системи контролю доступу і обліку робочого часу',
    subcategories: [
      {
        id: 'zamki-i-turniketi',
        name: 'Замки и турнікети',
      },
      {
        id: 'karti-breloki',
        name: 'Карти, брелоки',
      },
      {
        id: 'terminali',
        name: 'Термінали',
      },
      {
        id: 'knopki-vihodu',
        name: 'Кнопки виходу',
      },
      {
        id: 'zchituvachi',
        name: 'Зчитувачі',
      },
      {
        id: 'kontroleri',
        name: 'Контролери',
      },
      {
        id: 'komplektuyuchi-dlya-kontrolyu-dostupu',
        name: 'Комплектуючі для контролю доступу',
      },
    ],
  },
  {
    id: 'merezheve-obladnannya',
    name: 'Мережеве обладнання',
    subcategories: [
      {
        id: 'serverni-shafi',
        name: 'Серверні шафи',
      },
      {
        id: 'serverni-stiyki',
        name: 'Серверні стійки',
      },
      {
        id: 'patch-paneli',
        name: 'Патч-панелі',
      },
      {
        id: 'kabel-vita-para',
        name: 'Кабель вита пара',
      },
      {
        id: 'komutatori',
        name: 'Комутатори',
      },
      {
        id: 'marshrutizatori',
        name: 'Маршрутизатори',
      },
      {
        id: 'tochki-dostupu',
        name: 'Точки доступу',
      },
    ],
  },
  {
    id: 'suputnikove-telebachennya',
    name: 'Супутникове телебачення',
    subcategories: [
      {
        id: 'suputnikovi-tyuneri',
        name: 'Супутникові тюнери',
      },
      {
        id: 'suputnikovi-anteni',
        name: 'Супутникові антени',
      },
      {
        id: 'konvertori-dlya-suputnikovogo-tv',
        name: 'Конвертори для супутникового ТВ',
      },
      {
        id: 'komplektuyuchi-dlya-suputnikovogo-tv',
        name: 'Комплектуючі для супутникового ТВ',
      },
    ],
  },
  {
    id: 't2-tsifrove-telebachennya',
    name: 'Т2 цифрове телебачення',
    subcategories: [
      {
        id: 'tyuner-t2-pristavka',
        name: 'Тюнер Т2 приставка',
      },
      {
        id: 'antena-t2',
        name: 'Антена т2',
      },
      {
        id: 'komplektuyuchi-dlya-t2',
        name: 'Комплектуючі для т2',
      },
    ],
  },
  {
    id: 'pristavka-smart-tv-android',
    name: 'Приставка смарт тв Android',
    subcategories: [],
  },
  {
    id: 'dzherela-zhivlennya',
    name: 'Джерела живлення',
    subcategories: [
      {
        id: 'dzherela-bezperebiynogo-zhivlennya-12-24v',
        name: 'Джерела безперебійного живлення 12-24В',
      },
      {
        id: 'dbzh-invertori-stabilizatori-220v',
        name: 'ДБЖ, інвертори, стабілізатори 220В',
      },
      {
        id: 'bloki-zhivlennya',
        name: 'Блоки живлення',
      },
      {
        id: 'svintsevi-akumulyatori',
        name: 'Свинцеві акумулятори',
      },
      {
        id: 'litievi-akumulyatori',
        name: 'Літієві акумулятори',
      },
      {
        id: 'sistemi-nakopichennya-energiyi-bess',
        name: 'Системи накопичення енергії ВЕЅЅ',
      },
      {
        id: 'invertori',
        name: 'Інвертори',
      },
      {
        id: 'avtonomni-sistemi-zhivlennya',
        name: 'Автономні системи живлення',
      },
      {
        id: 'zaryadni-stantsiyi',
        name: 'Зарядні станції',
      },
    ],
  },
  {
    id: 'vstanovlennya-i-remont-obladnannya',
    name: 'Встановлення і ремонт обладнання',
    subcategories: [
      {
        id: 'ustanovka-videosposterezhennya',
        name: 'Установка відеоспостереження',
      },
      {
        id: 'ustanovka-domofoniv',
        name: 'Установка домофонів',
      },
      {
        id: 'vstanovlennya-ohoronno-pozhezhnoyi-signalizatsiyi',
        name: 'Встановлення охоронно-пожежної сигналізації',
      },
      {
        id: 'vstanovlennya-kontrolyu-dostupu-obliku-chasu',
        name: 'Встановлення контролю доступу, обліку часу',
      },
      {
        id: 'ozvuchuvannya-primischen',
        name: 'Озвучування приміщень',
      },
      {
        id: 'ustanovka-anten',
        name: 'Установка антен',
      },
      {
        id: 'montazh-kompyuternih-merezh',
        name: "Монтаж комп'ютерних мереж",
      },
      {
        id: 'remont-audio-video-ohoronnih-sistem',
        name: 'Ремонт аудіо, відео, охоронних систем',
      },
    ],
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

async function seedData() {
  console.log('Starting to seed category data...');

  // 1. Clean slate: Delete all existing categories
  console.log('Deleting existing categories...');
  const { error: deleteError } = await supabase
    .from('categories')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Dummy condition to delete all

  if (deleteError) {
    console.error('Error deleting categories:', deleteError);
    return;
  }
  console.log('Existing categories deleted.');

  // 2. Insert parent categories and map their old IDs to new UUIDs
  const idMap = new Map<string, string>();

  console.log('Inserting parent categories...');
  for (const category of catalogData) {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        name: category.name,
        slug: category.id,
        parent_id: null,
      })
      .select('id')
      .single();

    if (error) {
      console.error(
        `Error inserting parent category "${category.name}":`,
        error,
      );
      continue;
    }

    if (data) {
      idMap.set(category.id, data.id);
      console.log(`Inserted "${category.name}" with new ID: ${data.id}`);
    }
  }
  console.log('Parent categories inserted.');

  // 3. Insert subcategories using the mapped parent UUIDs
  console.log('Inserting subcategories...');
  for (const category of catalogData) {
    if (category.subcategories && category.subcategories.length > 0) {
      const parentId = idMap.get(category.id);
      if (!parentId) {
        console.warn(
          `Could not find parent ID for subcategories of "${category.name}". Skipping.`,
        );
        continue;
      }

      for (const subcategory of category.subcategories) {
        const { error } = await supabase.from('categories').insert({
          name: subcategory.name,
          slug: subcategory.id,
          parent_id: parentId,
        });

        if (error) {
          console.error(
            `Error inserting subcategory "${subcategory.name}":`,
            error,
          );
        } else {
          console.log(`  - Inserted subcategory "${subcategory.name}"`);
        }
      }
    }
  }
  console.log('Subcategories inserted.');
  console.log('Seeding complete!');
}

seedData().catch(console.error);
