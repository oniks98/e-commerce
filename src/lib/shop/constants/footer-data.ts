export interface FooterLink {
  title: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface ContactInfo {
  phones: string[];
  callbackText: string;
  address: string;
  workingHours: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export const footerData = {
  categories: {
    title: "Категорії",
    links: [
      { title: "Ліжка", href: "/categories/beds" },
      { title: "Матраци", href: "/categories/mattresses" },
      { title: "М'які меблі", href: "/categories/soft-furniture" },
      { title: "Шафи", href: "/categories/wardrobes" },
      { title: "Комоди", href: "/categories/dressers" },
      { title: "Тумби", href: "/categories/nightstands" },
      { title: "Столи", href: "/categories/tables" },
      { title: "Стільці", href: "/categories/chairs" },
      { title: "Меблеві стіни", href: "/categories/wall-units" },
      { title: "Кухні", href: "/categories/kitchens" }
    ]
  },
  information: {
    title: "Інформація",
    links: [
      { title: "Про нас", href: "/about" },
      { title: "Оплата", href: "/payment" },
      { title: "Доставка та збірка", href: "/delivery" },
      { title: "Відгуки", href: "/reviews" },
      { title: "Блог", href: "/blog" },
      { title: "Контакти", href: "/contacts" },
      { title: "Мапа сайту", href: "/sitemap" }
    ]
  },
  clients: {
    title: "Клієнтам",
    links: [
      { title: "Акції", href: "/promotions" },
      { title: "Розпродаж", href: "/sale" },
      { title: "Купити в кредит", href: "/credit" },
      { title: "Обмін і повернення товару", href: "/returns" },
      { title: "Часто задавані питання", href: "/faq" },
      { title: "Умови покупки", href: "/terms" },
      { title: "Політика конфіденційності", href: "/privacy" }
    ]
  },
  contacts: {
    phones: [
      "+38 067 929-45-45",
      "+38 050 133-45-45", 
      "+38 093 170-75-45"
    ],
    callbackText: "Передзвоніть мені",
    address: "м. Київ, провулок Ізяславський 52, поверх 2",
    workingHours: "Працюємо щодня з 9:00 до 18:00"
  },
  social: {
    title: "Приєднуйтесь:",
    links: [
      { name: "Facebook", href: "https://facebook.com/krovato", icon: "facebook" },
      { name: "Instagram", href: "https://instagram.com/krovato", icon: "instagram" }
    ]
  },
  messengers: {
    title: "Допомога і консультація:",
    links: [
      { name: "WhatsApp", href: "https://wa.me/380679294545", icon: "whatsapp" },
      { name: "Telegram", href: "https://t.me/krovato", icon: "telegram" },
      { name: "Viber", href: "viber://chat?number=380679294545", icon: "viber" }
    ]
  },
  copyright: "© KROVATO - Технології сну - 2022. Всі права захищені."
};
