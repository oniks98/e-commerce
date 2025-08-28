import { useTranslations } from 'next-intl';

export default function ReviewsPage() {
  const t = useTranslations('HelloWorld');

  return (
    <>
      <h1>{t('title')}</h1>
    </>
  );
}
