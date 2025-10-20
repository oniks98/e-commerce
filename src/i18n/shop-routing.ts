import { defineRouting } from 'next-intl/routing';

import { locales, defaultLocale } from './types';

// Минимальный роутинг для витрины
export const shopRouting = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always', // /uk/...
});
