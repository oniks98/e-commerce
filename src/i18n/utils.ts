// src/i18n/utils.ts
import { locales, defaultLocale, type Locale, type Segment } from './types';

export function validateLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function getMessages(locale: string, segment: Segment) {
  const safeLocale: Locale = validateLocale(locale)
    ? (locale as Locale)
    : defaultLocale;

  try {
    return (await import(`@/dictionaries/${segment}/${safeLocale}.json`))
      .default;
  } catch {
    console.error(
      `Failed to load messages for ${segment}, locale: ${safeLocale}`,
    );
    return (await import(`@/dictionaries/${segment}/${defaultLocale}.json`))
      .default;
  }
}

export function generateStaticLocaleParams() {
  return locales.map((locale) => ({ locale }));
}
