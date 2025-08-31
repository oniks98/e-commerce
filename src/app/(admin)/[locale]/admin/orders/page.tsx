import { getTranslations } from 'next-intl/server';

export default async function OrdersPage() {
  const t = await getTranslations('HelloWorld');

  return (
    <>
      <h1>{t('title')}</h1>
    </>
  );
}
