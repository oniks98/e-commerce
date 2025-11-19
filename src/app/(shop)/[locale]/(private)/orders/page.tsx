'use client';

import { useRouter } from 'next/navigation';

import ClientBreadcrumbs from '@/components/shop/ui/client-breadcrumbs';

import { useAuthStore } from '@/store/auth-store';

const ordersBreadcrumbs = [
  { label: 'Головна', href: '/' },
  { label: 'Замовлення', href: '/orders' },
];

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <div className="bg-light min-h-screen py-8">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
        <ClientBreadcrumbs items={ordersBreadcrumbs} className="mb-8" />
        <h1 className="text-dark mb-8 text-3xl font-bold">Мої замовлення</h1>

        <div className="rounded-lg bg-white p-8 text-center shadow-sm">
          <p className="text-grey text-lg">У вас поки немає замовлень</p>
          <button
            onClick={() => router.push('/catalog')}
            className="bg-sky hover:bg-sky-dark mt-6 rounded-lg px-6 py-3 font-semibold text-white transition-colors"
          >
            Перейти до каталогу
          </button>
        </div>
      </div>
    </div>
  );
}
