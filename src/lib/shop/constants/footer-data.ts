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
    title: 'Категорії',
    links: [
      { title: 'Ліжка', href: '/categories/beds' },
      { title: 'Матраци', href: '/categories/mattresses' },
      { title: "М'які меблі", href: '/categories/soft-furniture' },
      { title: 'Шафи', href: '/categories/wardrobes' },
      { title: 'Комоди', href: '/categories/dressers' },
      { title: 'Тумби', href: '/categories/nightstands' },
      { title: 'Столи', href: '/categories/tables' },
      { title: 'Стільці', href: '/categories/chairs' },
      { title: 'Меблеві стіни', href: '/categories/wall-units' },
      { title: 'Кухні', href: '/categories/kitchens' },
    ],
  },
  information: {
    title: 'Інформація',
    links: [
      { title: 'Про нас', href: '/about' },
      { title: 'Акції та знижки', href: '/promotions' },
      { title: 'Умови покупки', href: '/terms' },
      { title: 'Відгуки', href: '/reviews' },
      { title: 'Цікаво', href: '/blog' },
      { title: 'Контакти', href: '/contacts' },
    ],
  },
  contacts: {
    callbackText: 'Передзвоніть мені',
    address: 'м. Дніпро, вул.Чапленко 4/2',
    workingHours:
      'Працюємо з 10:00-14:00 крім вихідних або самовивіз за домовленністю з 8 до 20 у будь-який день.',
  },
  messengers: {
    title: 'Допомога і консультація:',
    links: [
      {
        name: 'WhatsApp',
        href: 'https://wa.me/380679294545',
        icon: 'whatsapp',
      },
      { name: 'Telegram', href: 'https://t.me/krovato', icon: 'telegram' },
      {
        name: 'Viber',
        href: 'viber://chat?number=380679294545',
        icon: 'viber',
      },
    ],
  },
  copyright: '2025 Розробка: Юрій Шпурик',
};
