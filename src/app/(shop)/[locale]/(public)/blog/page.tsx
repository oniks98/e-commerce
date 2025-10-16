import { setRequestLocale } from 'next-intl/server';

import Breadcrumbs from '@/components/shop/ui/breadcrumbs';
import Blog from '@/components/shop/blog/blog';
import Advantages from '@/components/shop/ui/advantages';

import { blogPageBreadcrumbs } from '@/lib/shop/constants/blog/blog-data';
import { Locale } from '@/i18n/types';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
        <Breadcrumbs items={blogPageBreadcrumbs} />
        <Blog />
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] md:pt-[30px]">
          <Advantages />
        </div>
      </div>
    </div>
  );
}
