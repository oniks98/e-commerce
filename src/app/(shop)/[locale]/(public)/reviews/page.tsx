import { reviewsPageBreadcrumbs } from '@/lib/shop/constants/reviews/reviews-data';
import Breadcrumbs from '@/components/shop/ui/breadcrumbs';
import ReviewsCompanyInfo from '@/components/shop/ui/reviews/reviews-company-info';
import LeaveReview from '@/components/shop/ui/leave-review';
import Advantages from '@/components/shop/ui/advantages';
import ReviewsClient from '@/components/shop/reviews/reviews-client';
import { Locale } from '@/i18n/types';
import { setRequestLocale } from 'next-intl/server';

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
            <ReviewsClient />
          </div>
          <div className="flex-shrink-0 lg:w-[410px]">
            <div className="flex flex-col">
              <ReviewsCompanyInfo />
              <LeaveReview />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
          <Advantages />
        </div>
      </div>
    </section>
  );
}
