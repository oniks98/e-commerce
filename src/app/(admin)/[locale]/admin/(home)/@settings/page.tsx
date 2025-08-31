import { getTranslations } from 'next-intl/server';

export default async function SettingsPage() {
  const t = await getTranslations('Admin');

  return (
    <>
      <h1>{t('title')}</h1>
    </>
  );
}
