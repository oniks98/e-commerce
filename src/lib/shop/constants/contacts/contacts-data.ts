import {
  CalendarIcon,
  EmailIcon,
  LocationIcon,
  OnMapIcon,
  PhoneIcon,
} from '@/lib/shop/icons';

export const contactsPageBreadcrumbs: { label: string; href: string }[] = [
  {
    label: 'Головна',
    href: '/',
  },
  {
    label: 'Контакти',
    href: '/contacts',
  },
];

interface ContactCard {
  Icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
  title: string;
  content: string[];
  showSocial: boolean;
}

export const contactsData = {
  title: 'Контакти',
  contacts: [
    {
      Icon: PhoneIcon,
      iconClassName:
        'flex h-[50px] w-[50px] items-center justify-center rounded-full bg-sky text-white',
      title: 'Телефони:',
      content: ['+38 063 338-82-60', '+38 067 636-01-90'],
      showSocial: false,
    },
    {
      Icon: EmailIcon,
      iconClassName:
        'flex h-[50px] w-[50px] items-center justify-center rounded-full bg-sky text-white',
      title: 'Напишіть нам:',
      content: ['oniksdnipro@gmail.com'],
      showSocial: true,
    },
    {
      Icon: LocationIcon,
      iconClassName:
        'flex h-[50px] w-[50px] items-center justify-center rounded-full bg-sky text-white',
      title: 'Де ми знаходимось:',
      content: ['м.Дніпро, вул. Чапленка 4/2'],
      showSocial: false,
    },
    {
      Icon: CalendarIcon,
      iconClassName:
        'flex h-[50px] w-[50px] items-center justify-center rounded-full bg-sky text-white',
      title: 'Графік роботи:',
      content: [
        'Працюємо щодня з 10:00 до 14:00 крім вихідних або самовивіз за домовленністю з 8 до 20 у будь-який день.',
      ],
      showSocial: false,
    },
  ] satisfies ContactCard[],
  map: {
    title: 'Схема проїзду',
    link: {
      Icon: OnMapIcon,
      text: 'Прокласти маршрут',
      href: 'https://maps.app.goo.gl/boz9UG9UF8cAVkr66',
    },
  },
  form: {
    title: 'Напишіть нам!',
    description:
      'Якщо у вас є побажання щодо якості обслуговування, пропозиції щодо партнерства, напишіть нам і наше керівництво зв`яжеться з вами!',
    subtitle: 'Або чекаємо на вас у гості!',
    namePlaceholder: "Ваше ім'я прізвище",
    emailPlaceholder: 'E-mail',
    phonePlaceholder: 'Контактний телефон',
    commentPlaceholder: 'Ваш коментар або питання',
    submitButton: 'Відправити',
  },
};
