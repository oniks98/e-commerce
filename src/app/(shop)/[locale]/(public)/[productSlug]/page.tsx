import { setRequestLocale } from 'next-intl/server';

import { getLocalizedValue } from '@/i18n/localized-content';
import { Locale } from '@/i18n/types';

import Card from '@/components/shop/product/card';
import Conditions from '@/components/shop/product/conditions';
import Desc from '@/components/shop/product/desc';
import Recommended from '@/components/shop/product/recommended';
import Reviews from '@/components/shop/product/reviews/reviews';
import Breadcrumbs from '@/components/shop/ui/breadcrumbs';
import LeaveReview from '@/components/shop/ui/leave-review';

import { getProductBySlug, getProducts } from '@/lib/shop/actions/product';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; productSlug: string }>;
}) {
  const { locale, productSlug } = await params;
  setRequestLocale(locale);
  const product = await getProductBySlug(productSlug, locale);
  const recommendedProducts = await getProducts({ limit: 8 });

  if (!product) {
    return <div>Product not found</div>;
  }

  const productName = getLocalizedValue(
    product.name,
    locale,
    'Unnamed Product',
  );

  return (
    <div className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
        <div className="flex flex-col">
          <Breadcrumbs product={product} locale={locale} />

          <Card product={product} locale={locale} productName={productName} />

          <Conditions locale={locale} />

          <div className="grid grid-cols-1 gap-5 py-8 md:grid-cols-[1fr_350px]">
            <Desc />
            <LeaveReview />
          </div>
          <div className="grid grid-cols-1 gap-5 py-8 xl:grid-cols-[1fr_350px]">
            <Reviews productName={productName} />
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
          <Recommended products={recommendedProducts} />
        </div>
      </div>
    </div>
  );
}
