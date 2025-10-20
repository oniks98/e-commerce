import { setRequestLocale } from 'next-intl/server';

import { Locale } from '@/i18n/types';

import ReviewsContent from '@/components/shop/reviews/reviews-content';
import Breadcrumbs from '@/components/shop/ui/breadcrumbs';
import LeaveReview from '@/components/shop/ui/leave-review';
import ReviewsCompanyInfo from '@/components/shop/ui/reviews/reviews-company-info';

import { reviewsPageBreadcrumbs } from '@/lib/shop/constants/reviews/reviews-data';

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 pb-8 md:px-[35px] xl:mt-[138px]">
        <Breadcrumbs className="mb-10" items={reviewsPageBreadcrumbs} />

        <h1 className="mb-10 text-4xl font-semibold">Відгуки</h1>

        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="flex-grow">
            <ReviewsContent />
          </div>
          <div className="flex-shrink-0 lg:w-[410px]">
            <div className="flex flex-col">
              <ReviewsCompanyInfo />
              <LeaveReview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
