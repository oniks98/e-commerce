import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import { Article } from '@/lib/shop/constants/home/articles-data';
import { ArrowUpRightIcon } from '@/lib/shop/icons';
import { getPlaceholder } from '@/lib/shop/media/cloudinary';

interface ArticleCardProps {
  article: Article;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, className }) => {
  return (
    <article
      className={clsx(
        'border-grey-light-r flex h-[476px] w-full flex-col overflow-hidden rounded-lg border bg-white shadow-[-3px_4px_15px_0px_rgba(0,0,0,0.06)]',
        className,
      )}
    >
      <div className="relative h-[270px] w-full flex-shrink-0">
        <Image
          src={getPlaceholder('articles', article.image)}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col p-[30px]">
        <h3 className="text-dark h-[102px] text-[26px] leading-[1.3] font-semibold">
          {article.title}
        </h3>
        <Link
          href={article.link}
          className="text-yellow mt-[30px] inline-flex items-center gap-[10px] text-[19px] font-semibold"
        >
          Детальніше
          <ArrowUpRightIcon />
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
