'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import clsx from 'clsx';

import PaginationArrowLeftIcon from '@/lib/shop/icons/pagination-arrow-left-icon';

const PaginationArrowRightIcon = () => (
  <div className="rotate-180 transform">
    <PaginationArrowLeftIcon />
  </div>
);

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', page.toString());
      }

      const newUrl = params.toString() ? `?${params.toString()}` : '';
      router.push(newUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [router, searchParams],
  );

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage > totalPages - 4) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-grey flex h-12 w-12 items-center justify-center rounded-md border disabled:opacity-50"
      >
        <PaginationArrowLeftIcon />
      </button>
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && handlePageChange(page)}
          disabled={page === '...'}
          className={clsx(
            'flex h-12 w-12 items-center justify-center rounded-md border',
            {
              'border-yellow-dark bg-yellow-dark text-white':
                currentPage === page,
              'border-gray-300': currentPage !== page,
            },
          )}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-grey flex h-12 w-12 items-center justify-center rounded-md border disabled:opacity-50"
      >
        <PaginationArrowRightIcon />
      </button>
    </nav>
  );
};

export default Pagination;
