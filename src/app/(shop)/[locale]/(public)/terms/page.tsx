import OtherConditions from '@/components/shop/terms/other-conditions';
import { setRequestLocale } from 'next-intl/server';

import Breadcrumbs from '@/components/shop/ui/breadcrumbs';
import Head from '@/components/shop/terms/head';
import PaymentMethods from '@/components/shop/terms/payment-methods';
import DeliveryMethods from '@/components/shop/terms/delivery-methods';
import Faq from '@/components/shop/terms/faq';

import { termsPageBreadcrumbs } from '@/lib/shop/constants/terms/terms-data';

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
        <Breadcrumbs items={termsPageBreadcrumbs} className="mb-[30px]" />
        <Head />
        <PaymentMethods />
        <DeliveryMethods />
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
          <OtherConditions />
        </div>
      </div>

      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
        <Faq />
      </div>
    </section>
  );
}
