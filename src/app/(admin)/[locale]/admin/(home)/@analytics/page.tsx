import { getTranslations } from 'next-intl/server';

export default async function AnalyticsPage() {
  const t = await getTranslations('Admin');

  return (
    <>
      <h1>{t('title')}</h1>
    </>
  );
}
