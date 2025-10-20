import { setRequestLocale } from 'next-intl/server';

import { Locale } from '@/i18n/types';

import ExecutionContract from '@/components/shop/cart/execution-contract';
import Breadcrumbs from '@/components/shop/ui/breadcrumbs';

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cartLabel = locale === 'uk' ? 'Кошик' : 'Cart';
  const homeLabel = locale === 'uk' ? 'Головна' : 'Home';

  const breadcrumbs = [
    { label: homeLabel, href: `/${locale}` },
    { label: cartLabel, href: `/${locale}/cart`, active: true },
  ];

  return (
    <div className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
        <Breadcrumbs items={breadcrumbs} locale={locale} />
        <h1 className="text-dark py-8 text-center text-4xl font-semibold md:text-start">
          Оформлення замовлення
        </h1>
        <ExecutionContract />
      </div>
    </div>
  );
}
