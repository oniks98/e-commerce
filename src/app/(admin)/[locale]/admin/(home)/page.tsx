// src\app\(admin)\[locale]\admin\(home)\page.tsx

import { getTranslations } from 'next-intl/server';

export default async function AdminHomePage() {
  const t = await getTranslations('Admin');

  return (
    <>
      <h1>{t('title')}</h1>
    </>
  );
}
