
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import React from "react";
import '@/styles/globals.css';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang="en">
      <body>
    <NextIntlClientProvider messages={messages}>
      {children}
        </NextIntlClientProvider>
        </body>
      </html>
  );
}