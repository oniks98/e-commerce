'use client';

import Link from 'next/link';
import clsx from 'clsx';

import { articlesData } from '@/lib/shop/constants/articles-data';
import ArticleCard from '@/components/shop/articles/article-card';
import Carousel from '@/components/ui/carousel';
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/lib/shop/icons';
const Articles = () => {
  const slides = articlesData.map((article) => (
    <ArticleCard key={article.id} article={article} />
  ));

  const tabletSlides = [];
  for (let i = 0; i < articlesData.length; i += 2) {
    tabletSlides.push(
      <div key={i} className="flex gap-x-[30px]">
        <ArticleCard article={articlesData[i]} />
        {articlesData[i + 1] && <ArticleCard article={articlesData[i + 1]} />}
      </div>,
    );
  }

  return (
    <section className="py-[60px] md:py-[80px] xl:py-[120px]">
      <div className="mx-auto">
        <div className="mb-10 flex items-center justify-start gap-x-[30px]">
          <h2 className="text-dark text-3xl font-semibold">
            Свіжі статті та останні новини
          </h2>
          <Link
            href="/blog"
            className="text-yellow hidden items-center gap-[10px] text-[19px] font-semibold md:inline-flex"
          >
            Читати блог
            <ArrowUpRightIcon />
          </Link>
          <div className="md:w-35"></div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel
            slides={slides}
            options={{
              loop: true,
              align: 'start',
              slidesToScroll: 1,
              perPage: 1,
            }}
            showDots={false}
          />
        </div>

        {/* Tablet Carousel */}
        <div className="hidden md:block xl:hidden">
          <Carousel
            slides={tabletSlides}
            options={{
              loop: true,
              align: 'start',
              slidesToScroll: 1,
              perPage: 1, // Each slide is a row of 2 cards
            }}
            prevButton={<PrevButton />}
            nextButton={<NextButton />}
            showDots={false}
          />
        </div>

        {/* Desktop Carousel */}
        <div className="hidden xl:block">
          <Carousel
            slides={slides}
            options={{
              loop: true,
              align: 'start',
              slidesToScroll: 1,
              perPage: 3,
              gap: 30,
            }}
            prevButton={<PrevButton />}
            nextButton={<NextButton />}
            showDots={false}
          />
        </div>

        <div className="mt-10 md:hidden">
          <Link
            href="/blog"
            className="bg-yellow flex h-[50px] w-full items-center justify-center gap-[15px] rounded-lg"
          >
            <span className="text-lg font-semibold text-white">
              Читати блог
            </span>
            <ArrowUpRightIcon className="text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const PrevButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="text-yellow absolute top-[-90px] right-[80px] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-md"
  >
    <ChevronLeftIcon />
  </button>
);

const NextButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="text-yellow absolute top-[-90px] right-0 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-md"
  >
    <ChevronRightIcon />
  </button>
);

export default Articles;
