'use client';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Locale } from '@/i18n/types';

import BtnLoadMore from '@/components/shop/ui/btn-load-more';
import Pagination from '@/components/shop/ui/pagination';

import { blogData } from '@/lib/shop/constants/blog/blog-data';
import { ArrowUpRightIcon } from '@/lib/shop/icons';

const BLOG_POSTS_PER_PAGE = 9;

const Blog = ({ locale }: { locale: Locale }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [displayedBlogPosts, setDisplayedBlogPosts] = useState(
    blogData.articles.slice(0, BLOG_POSTS_PER_PAGE),
  );

  const [pageToLoadNext, setPageToLoadNext] = useState(2);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(blogData.articles.length / BLOG_POSTS_PER_PAGE);

  useEffect(() => {
    const startIndex = (currentPage - 1) * BLOG_POSTS_PER_PAGE;
    const endIndex = startIndex + BLOG_POSTS_PER_PAGE;

    setDisplayedBlogPosts(blogData.articles.slice(startIndex, endIndex));
    setPageToLoadNext(currentPage + 1);
  }, [currentPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;

      const params = new URLSearchParams(searchParams.toString());

      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', page.toString());
      }

      const newUrl = `?${params.toString()}`;
      router.push(newUrl, { scroll: false });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [router, searchParams, totalPages],
  );

  const loadMoreBlogPosts = () => {
    if (pageToLoadNext > totalPages) return;

    const startIndex = (pageToLoadNext - 1) * BLOG_POSTS_PER_PAGE;
    const endIndex = startIndex + BLOG_POSTS_PER_PAGE;
    const newBlogPosts = blogData.articles.slice(startIndex, endIndex);

    setDisplayedBlogPosts((prevBlogPosts) => [
      ...prevBlogPosts,
      ...newBlogPosts,
    ]);

    setPageToLoadNext((prev) => prev + 1);
  };

  const canLoadMore =
    pageToLoadNext <= totalPages &&
    displayedBlogPosts.length < blogData.articles.length;

  return (
    <section className="py-10" aria-labelledby="blog-heading">
      <header>
        <h1 id="blog-heading" className="mb-8 text-3xl font-bold">
          Блог
        </h1>
      </header>

      <ul className="grid list-none gap-[30px] md:grid-cols-[repeat(auto-fit,minmax(410px,1fr))]">
        {displayedBlogPosts.map((post, index) => (
          <li key={index}>
            <Link
              href={`/${locale}/blog/${post.slug}`}
              aria-label={`Читати більше про ${post.title}`}
            >
              <article className="border-grey-light-r flex h-full flex-col overflow-hidden rounded-lg border bg-white transition-shadow duration-300 hover:shadow-xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={410}
                  height={270}
                  className="h-auto w-full rounded-lg"
                />

                <div className="flex flex-grow flex-col p-6">
                  <h2 className="mb-4 flex-grow text-xl font-semibold">
                    {post.title}
                  </h2>

                  <div className="text-sky hover:text-sky-dark gap-[10px]font-semibold flex items-center text-[19px]">
                    <span className="mr-[10px]">Детальніше</span>
                    <ArrowUpRightIcon
                      className="text-sky h-3 w-3"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>

      {canLoadMore && (
        <footer className="mt-10 flex justify-center">
          <BtnLoadMore onClick={loadMoreBlogPosts}>
            Показати ще{' '}
            {Math.min(
              BLOG_POSTS_PER_PAGE,
              blogData.articles.length - displayedBlogPosts.length,
            )}{' '}
          </BtnLoadMore>
        </footer>
      )}

      <nav
        className="hidden md:block"
        aria-label="Навігація по сторінкам блогу"
      >
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </nav>
    </section>
  );
};

export default Blog;
