export interface CatalogCategory {
  id: string;
  name: string;
  href: string;
  subcategories?: CatalogSubcategory[];
}

export interface CatalogSubcategory {
  id: string;
  name: string;
  href: string;
}

export const catalogData: CatalogCategory[] = [
  {
    id: 'beds',
    name: 'Ліжка',
    href: '/catalog/beds',
    subcategories: [
      {
        id: 'single-beds',
        name: 'Односпальні ліжка',
        href: '/catalog/beds/single',
      },
      {
        id: 'double-beds',
        name: 'Двоспальні ліжка',
        href: '/catalog/beds/double',
      },
      { id: 'kids-beds', name: 'Дитячі ліжка', href: '/catalog/beds/kids' },
    ],
  },
  {
    id: 'mattresses',
    name: 'Матраци',
    href: '/catalog/mattresses',
    subcategories: [
      {
        id: 'single-mattresses',
        name: 'Односпальні матраци',
        href: '/catalog/mattresses/single',
      },
      {
        id: 'double-mattresses',
        name: 'Двоспальні матраци',
        href: '/catalog/mattresses/double',
      },
      {
        id: 'bonnel-spring',
        name: 'Пружинний блок Bonnel',
        href: '/catalog/mattresses/bonnel',
      },
      {
        id: 'pocket-spring',
        name: 'Пружинний блок Pocket Spring',
        href: '/catalog/mattresses/pocket',
      },
      {
        id: 'springless',
        name: 'Безпружинні матраци',
        href: '/catalog/mattresses/springless',
      },
      {
        id: 'winter-summer',
        name: 'Матраци з ефектом Зима-Літо',
        href: '/catalog/mattresses/winter-summer',
      },
      { id: 'futons', name: 'Футони', href: '/catalog/mattresses/futons' },
      {
        id: 'kids-mattresses',
        name: 'Дитячі матраци',
        href: '/catalog/mattresses/kids',
      },
      {
        id: 'economy-mattresses',
        name: 'Матраци Економ',
        href: '/catalog/mattresses/economy',
      },
    ],
  },
  {
    id: 'soft-furniture',
    name: "М'які меблі",
    href: '/catalog/soft-furniture',
    subcategories: [
      { id: 'sofas', name: 'Дивани', href: '/catalog/soft-furniture/sofas' },
      {
        id: 'armchairs',
        name: 'Крісла',
        href: '/catalog/soft-furniture/armchairs',
      },
      {
        id: 'ottomans',
        name: 'Пуфи',
        href: '/catalog/soft-furniture/ottomans',
      },
    ],
  },
  {
    id: 'wardrobes',
    name: 'Шафи',
    href: '/catalog/wardrobes',
    subcategories: [
      {
        id: 'sliding-wardrobes',
        name: 'Шафи-купе',
        href: '/catalog/wardrobes/sliding',
      },
      {
        id: 'hinged-wardrobes',
        name: 'Розпашні шафи',
        href: '/catalog/wardrobes/hinged',
      },
      {
        id: 'corner-wardrobes',
        name: 'Кутові шафи',
        href: '/catalog/wardrobes/corner',
      },
    ],
  },
  {
    id: 'chests',
    name: 'Комоди',
    href: '/catalog/chests',
    subcategories: [
      {
        id: 'bedroom-chests',
        name: 'Комоди для спальні',
        href: '/catalog/chests/bedroom',
      },
      {
        id: 'living-room-chests',
        name: 'Комоди для вітальні',
        href: '/catalog/chests/living-room',
      },
      {
        id: 'kids-chests',
        name: 'Дитячі комоди',
        href: '/catalog/chests/kids',
      },
    ],
  },
  {
    id: 'nightstands',
    name: 'Тумби',
    href: '/catalog/nightstands',
    subcategories: [
      {
        id: 'bedside-tables',
        name: 'Прикроватні тумбочки',
        href: '/catalog/nightstands/bedside',
      },
      {
        id: 'tv-stands',
        name: 'ТВ-тумби',
        href: '/catalog/nightstands/tv-stands',
      },
      {
        id: 'entrance-tables',
        name: 'Тумби для прихожої',
        href: '/catalog/nightstands/entrance',
      },
    ],
  },
  {
    id: 'tables',
    name: 'Столи',
    href: '/catalog/tables',
    subcategories: [
      {
        id: 'dining-tables',
        name: 'Обідні столи',
        href: '/catalog/tables/dining',
      },
      {
        id: 'coffee-tables',
        name: 'Журнальні столи',
        href: '/catalog/tables/coffee',
      },
      {
        id: 'work-desks',
        name: 'Робочі столи',
        href: '/catalog/tables/work-desks',
      },
    ],
  },
  {
    id: 'chairs',
    name: 'Стільці',
    href: '/catalog/chairs',
    subcategories: [
      {
        id: 'dining-chairs',
        name: 'Обідні стільці',
        href: '/catalog/chairs/dining',
      },
      {
        id: 'office-chairs',
        name: 'Офісні стільці',
        href: '/catalog/chairs/office',
      },
      {
        id: 'bar-stools',
        name: 'Барні стільці',
        href: '/catalog/chairs/bar-stools',
      },
    ],
  },
  {
    id: 'wall-units',
    name: 'Меблеві стіни',
    href: '/catalog/wall-units',
    subcategories: [
      {
        id: 'living-room-walls',
        name: 'Стінки для вітальні',
        href: '/catalog/wall-units/living-room',
      },
      {
        id: 'modular-walls',
        name: 'Модульні стінки',
        href: '/catalog/wall-units/modular',
      },
    ],
  },
  {
    id: 'kitchens',
    name: 'Кухні',
    href: '/catalog/kitchens',
    subcategories: [
      {
        id: 'modern-kitchens',
        name: 'Сучасні кухні',
        href: '/catalog/kitchens/modern',
      },
      {
        id: 'classic-kitchens',
        name: 'Класичні кухні',
        href: '/catalog/kitchens/classic',
      },
      {
        id: 'corner-kitchens',
        name: 'Кутові кухні',
        href: '/catalog/kitchens/corner',
      },
    ],
  },
];
