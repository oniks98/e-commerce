import { setRequestLocale } from 'next-intl/server';

import { Locale } from '@/i18n/types';

import Blog from '@/components/shop/blog/blog';
import Breadcrumbs from '@/components/shop/ui/breadcrumbs';

import { blogData } from '@/lib/shop/constants/blog/blog-data';

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
        <Breadcrumbs items={blogData.breadcrumbs} />
        <Blog locale={locale} />
      </div>
    </div>
  );
}
