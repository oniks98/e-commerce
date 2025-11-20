import { setRequestLocale } from 'next-intl/server';

import DeliveryMethods from '@/components/shop/terms/delivery-methods';
import Faq from '@/components/shop/terms/faq';
import Head from '@/components/shop/terms/head';
import OtherConditions from '@/components/shop/terms/other-conditions';
import PaymentMethods from '@/components/shop/terms/payment-methods';
import Breadcrumbs from '@/components/shop/ui/breadcrumbs';

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
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-38">
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
