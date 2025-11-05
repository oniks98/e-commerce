import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import { Locale } from '@/i18n/types';

import { ArrowUpRightIcon } from '@/lib/shop/icons';
import { IArticle } from '@/lib/shop/types/article';

interface ArticleCardProps {
  article: IArticle;
  className?: string;
  locale: Locale;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  className,
  locale,
}) => {
  return (
    <Link
      href={`/${locale}/blog/${article.slug}`}
      aria-label={`Читати більше про ${article.title}`}
      className={clsx(
        'border-grey-light-r flex h-full w-full flex-col overflow-hidden rounded-lg border bg-white shadow-[-3px_4px_15px_0px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-xl',
        className,
      )}
    >
      <div className="relative h-[270px] w-full flex-shrink-0">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="grid flex-1 grid-rows-[1fr_auto] p-[30px]">
        <h3 className="text-dark text-[26px] leading-[1.3] font-semibold">
          {article.title}
        </h3>
        <div className="text-sky hover:text-sky-dark mt-[30px] inline-flex items-center gap-[10px] text-[19px] font-semibold">
          Детальніше
          <ArrowUpRightIcon />
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
