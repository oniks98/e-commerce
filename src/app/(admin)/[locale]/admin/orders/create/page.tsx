import { await getTranslations } from 'next-intl/server';

export default function OrdersPage() {
  const t = await getTranslations('HelloWorld');

  return (
    <>
      <h1>{t('title')}</h1>
    </>
  );
}
