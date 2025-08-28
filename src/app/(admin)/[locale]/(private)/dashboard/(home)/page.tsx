// src\app\(admin)\[locale]\(private)\dashboard\(home)\page.tsx
'use client';
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('HelloWorld');

  return (
    <>
      <h1>{t('title')}</h1>
    </>
  );
}
