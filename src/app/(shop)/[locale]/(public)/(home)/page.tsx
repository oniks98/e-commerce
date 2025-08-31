// src\app\(shop)\[locale]\(public)\(home)\page.tsx
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('HelloWorld');

  return (
    <>
      <h1>{t('title')}</h1>
    </>
  );
}
