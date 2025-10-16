'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_DATA } from '@/lib/shop/constants/blog/blog-data';
import ArrowUpRightIcon from '@/lib/shop/icons/arrow-up-right-icon';
import BtnLoadMore from '@/components/shop/ui/btn-load-more';
import Pagination from '@/components/shop/ui/pagination';

const BLOG_POSTS_PER_PAGE = 9;

const Blog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [displayedBlogPosts, setDisplayedBlogPosts] = useState(
    BLOG_DATA.slice(0, BLOG_POSTS_PER_PAGE),
  );

  const [pageToLoadNext, setPageToLoadNext] = useState(2);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(BLOG_DATA.length / BLOG_POSTS_PER_PAGE);

  useEffect(() => {
    const startIndex = (currentPage - 1) * BLOG_POSTS_PER_PAGE;
    const endIndex = startIndex + BLOG_POSTS_PER_PAGE;

    setDisplayedBlogPosts(BLOG_DATA.slice(startIndex, endIndex));
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
    const newBlogPosts = BLOG_DATA.slice(startIndex, endIndex);

    setDisplayedBlogPosts((prevBlogPosts) => [
      ...prevBlogPosts,
      ...newBlogPosts,
    ]);

    setPageToLoadNext((prev) => prev + 1);
  };

  const canLoadMore =
    pageToLoadNext <= totalPages &&
    displayedBlogPosts.length < BLOG_DATA.length;

  return (
    <section className="py-10" aria-labelledby="blog-heading">
      <header>
        <h1 id="blog-heading" className="mb-8 text-3xl font-bold">
          Блог
        </h1>
      </header>

      <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(410px,1fr))] gap-[30px]">
        {displayedBlogPosts.map((post, index) => (
          <li key={index}>
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

                <Link
                  href="#"
                  className="text-yellow gap-[10px]font-semibold flex items-center text-[19px]"
                  aria-label={`Читати більше про ${post.title}`}
                >
                  <span className="mr-[10px]">Детальніше</span>
                  <ArrowUpRightIcon
                    className="text-yellow h-3 w-3"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {canLoadMore && (
        <footer className="mt-10 flex justify-center">
          <BtnLoadMore onClick={loadMoreBlogPosts}>
            Показати ще{' '}
            {Math.min(
              BLOG_POSTS_PER_PAGE,
              BLOG_DATA.length - displayedBlogPosts.length,
            )}{' '}
            статей
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
