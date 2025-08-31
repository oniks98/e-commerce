import { getTranslations } from 'next-intl/server';

export default async function ReviewsPage() {
  const t = await getTranslations('Admin');

  return (
    <>
      <h1>{t('title')}</h1>
    </>
  );
}
