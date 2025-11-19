import { setRequestLocale } from 'next-intl/server';

import Favorites from '@/components/shop/favorites/favorites';
import AuthProvider from '@/components/shop/providers/auth-provider';
import Breadcrumbs from '@/components/shop/ui/breadcrumbs';
import ConditionalProfileLayout from '@/components/shop/ui/conditional-profile-layout';
import ProfileSidebar from '@/components/shop/ui/profile-sidebar';

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
    <AuthProvider>
      <div className="bg-light">
        <div className="mx-auto max-w-[1360px] px-4 pb-8 md:px-[35px] xl:mt-[138px]">
          <ConditionalProfileLayout>
            <Breadcrumbs items={favoritesBreadcrumbs} className="mb-8" />
            <Favorites locale={locale} />
          </ConditionalProfileLayout>
        </div>
      </div>
    </AuthProvider>
  );
}
