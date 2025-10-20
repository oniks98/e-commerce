// src/middleware.ts
import createIntlMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

import { adminRouting } from '@/i18n/admin-routing';
import { shopRouting } from '@/i18n/shop-routing';
import { locales } from '@/i18n/types';

const adminMW = createIntlMiddleware(adminRouting);
const shopMW = createIntlMiddleware(shopRouting);

function isAdminPath(pathname: string) {
  // ожидаем /:locale/... c localePrefix: 'always'
  const segs = pathname.split('/').filter(Boolean); // ['', 'uk', 'admin'] -> ['uk','admin']
  if (segs.length === 0) return false;
  const hasLocale = locales.includes(segs[0] as (typeof locales)[number]);
  const afterLocale = hasLocale ? segs.slice(1) : segs;
  return afterLocale[0] === 'admin';
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isAdminPath(pathname)) {
    const res = adminMW(req);
    res.headers.set('x-segment', 'admin');
    return res;
  }

  const res = shopMW(req);
  res.headers.set('x-segment', 'shop');
  return res;
}

// Обрабатываем всё, кроме статики
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
