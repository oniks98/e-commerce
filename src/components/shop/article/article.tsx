import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MarkIcon from '@/lib/shop/icons/mark-icon';
import { Button } from '@/components/shop/ui/button';
import ArrowLeftIcon from '@/lib/shop/icons/arrow-left-icon';
import ArrowRightIcon from '@/lib/shop/icons/arrow-right-icon';
import { IArticle } from '@/lib/shop/types/article';

interface IArticleProps {
  article: IArticle;
  articles: IArticle[];
}

const Article: FC<IArticleProps> = ({ article, articles }) => {
  if (!article) {
    return <div className="h-full">Article not found</div>;
  }

  const currentIndex = articles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  return (
    <div className="mx-auto max-w-[1070px] pb-[60px]">
      <h1 className="text-dark mb-10 text-4xl font-semibold">
        {article.title}
      </h1>
      <div className="relative mb-12 h-[380px] w-full">
        <Image
          src={article.image}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="text-dark mb-12 text-base">
        <p>{article.body.p1}</p>
      </div>
      <div className="mb-12">
        <h2 className="text-dark mb-6 text-2xl font-semibold">
          {article.body.h2}
        </h2>
        <ul className="space-y-5">
          {article.body.list.map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-4 h-8 w-8">
                <MarkIcon />
              </div>
              <p className="text-dark flex-1 text-base">{item}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-dark mb-12 text-base">
        <p>{article.body.p2}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-5 md:justify-between">
        {prevArticle ? (
          <Link href={`/blog/${prevArticle.slug}`}>
            <Button className="w-65">
              <ArrowLeftIcon className="mr-4" />
              Попередня стаття
            </Button>
          </Link>
        ) : (
          <Button disabled className="w-65">
            <ArrowLeftIcon className="mr-4" />
            Попередня стаття
          </Button>
        )}
        {nextArticle ? (
          <Link href={`/blog/${nextArticle.slug}`}>
            <Button className="w-65">
              Наступна стаття
              <ArrowRightIcon className="ml-4" />
            </Button>
          </Link>
        ) : (
          <Button disabled className="w-65">
            Наступна стаття
            <ArrowRightIcon className="ml-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Article;
