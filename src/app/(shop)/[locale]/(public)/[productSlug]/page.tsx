import Breadcrumbs from '@/components/shop/ui/breadcrumbs';
import Advantages from '@/components/shop/ui/advantages';
import { Recommended } from '@/components/shop/product/recommended';
import { Reviews } from '@/components/shop/product/reviews';
import { LeaveReview } from '@/components/shop/product/leave-review';
import { Desc } from '@/components/shop/product/desc';
import { Conditions } from '@/components/shop/product/conditions';
import { Card } from '@/components/shop/product/card';

import { Locale } from '@/i18n/types';
import { getProductBySlug, getProducts } from '@/lib/shop/actions/product';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; productSlug: string }>;
}) {
  const { locale, productSlug } = await params;
  const product = await getProductBySlug(productSlug, locale);
  const recommendedProducts = await getProducts({ limit: 8 });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
        <div className="flex flex-col">
          <Breadcrumbs product={product} />

          <Card product={product} locale={locale} />

          <div className="mb-[50px]">
            <Conditions />
          </div>
          <div className="mb-[50px] flex gap-x-5">
            <Desc />
            <LeaveReview />
          </div>
          <div className="mb-[70px]">
            <Reviews />
          </div>
          <div className="mb-[80px]">
            <Recommended products={recommendedProducts} />
          </div>
          <div className="mb-[70px]">
            <Advantages />
          </div>
        </div>
      </div>
    </div>
  );
}
