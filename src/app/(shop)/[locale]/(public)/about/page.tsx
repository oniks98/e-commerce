import { setRequestLocale } from 'next-intl/server';

import Breadcrumbs from '@/components/shop/ui/breadcrumbs';
import Head from '@/components/shop/about/head';
import AboutAdvantages from '@/components/shop/about/about-advantages';
import Reviews from '@/components/shop/ui/reviews/reviews';

import { aboutPageBreadcrumbs } from '@/lib/shop/constants/about/about-data';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
        <Breadcrumbs items={aboutPageBreadcrumbs} className="mb-[30px]" />
        <Head />
        <AboutAdvantages />
      </div>
      <Reviews />
    </div>
  );
}
