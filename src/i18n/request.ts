// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { getMessages, validateLocale } from './utils';
import { shopRouting } from './shop-routing';
import { adminRouting } from './admin-routing';
import type { Locale, Segment } from './types';

export default getRequestConfig(async ({ requestLocale }) => {
  const headersList = await headers();
  const segment = (headersList.get('x-segment') as Segment) || 'shop';

  const rawLocale = await requestLocale;
  const locale: Locale = validateLocale(rawLocale ?? '')
    ? (rawLocale as Locale)
    : segment === 'admin'
      ? adminRouting.defaultLocale
      : shopRouting.defaultLocale;

  return {
    locale,
    messages: await getMessages(locale, segment),
  };
});
