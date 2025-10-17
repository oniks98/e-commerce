import { setRequestLocale } from 'next-intl/server';

import Breadcrumbs from '@/components/shop/ui/breadcrumbs';
import Article from '@/components/shop/article/article';

import { blogData } from '@/lib/shop/constants/blog-data';
import { Locale } from '@/i18n/types';
import { IArticle } from '@/lib/shop/types/article';

type BreadcrumbItem = {
  label: string;
  href: string;
  active?: boolean;
};

export async function generateStaticParams() {
  return blogData.articles.map((article) => ({
    article: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; article: string }>;
}) {
  const { locale, article: articleSlug } = await params;
  setRequestLocale(locale);

  const article: IArticle | undefined = blogData.articles.find(
    (a) => a.slug === articleSlug,
  );

  const breadcrumbs: BreadcrumbItem[] = blogData.breadcrumbs.map((item) => {
    if (item.href.includes('[article]')) {
      return {
        ...item,
        label: article?.title || '',
        href: item.href.replace('[article]', article?.slug || ''),
      };
    }
    return item;
  });

  return (
    <div className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
        <Breadcrumbs items={breadcrumbs} className="mb-10" />
        <Article article={article as IArticle} articles={blogData.articles} />
      </div>
    </div>
  );
}
