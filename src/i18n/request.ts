// src/i18n/request.ts
import { headers } from 'next/headers';

import { getRequestConfig } from 'next-intl/server';

import { adminRouting } from './admin-routing';
import { shopRouting } from './shop-routing';
import { getMessages, validateLocale } from './utils';

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
