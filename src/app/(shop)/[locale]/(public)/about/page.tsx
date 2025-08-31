import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
  const t = await getTranslations('HelloWorld');

  return (
    <>
      <h1>{t('title')}</h1>
    </>
  );
}
