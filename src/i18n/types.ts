// src\i18n\types.ts
export const locales = ['en', 'uk'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export type Segment = 'admin' | 'shop';
