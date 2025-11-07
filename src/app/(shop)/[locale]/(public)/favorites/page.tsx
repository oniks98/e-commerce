import { setRequestLocale } from 'next-intl/server';

import Favorites from '@/components/shop/favorites/favorites';
import Breadcrumbs from '@/components/shop/ui/breadcrumbs';

interface FavoritesPageProps {
  params: Promise<{ locale: string }>;
}

const favoritesBreadcrumbs = [
  { label: 'Головна', href: '/' },
  { label: 'Обране', href: '/favorites' },
];

export default async function FavoritesPage({ params }: FavoritesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 pb-8 md:px-[35px] xl:mt-[138px]">
        <Breadcrumbs items={favoritesBreadcrumbs} className="mb-8" />
        <Favorites locale={locale} />
      </div>
    </div>
  );
}
