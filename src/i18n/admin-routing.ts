import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './types';

// Минимальный роутинг для admin
export const adminRouting = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always', // /uk/admin
  // pathnames можно не указывать, ссылки пишутся через AdminLink с коротким href
});
