// src\app\(admin)\[locale]\layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { locales } from '@/i18n/types';
import { getMessages } from '@/i18n/utils';

import '@/styles/globals-admin.css';

interface AdminLocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AdminLocaleLayout({
  children,
  params,
}: AdminLocaleLayoutProps) {
  const { locale } = await params;

  // Устанавливаем локаль для текущего запроса
  setRequestLocale(locale);

  // Загружаем словарь только для админки
  const messages = await getMessages(locale, 'admin');

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
