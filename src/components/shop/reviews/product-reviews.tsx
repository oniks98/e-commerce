'use client';

import { useState } from 'react';

import clsx from 'clsx';

import ReplyForm from '@/components/shop/product/reviews/reply-form';
import ReplyItem from '@/components/shop/product/reviews/reply-item';
import ReviewItem from '@/components/shop/product/reviews/review-item';
import BtnLoadMore from '@/components/shop/ui/btn-load-more';
import Pagination from '@/components/shop/ui/pagination';

import { Reply } from '@/lib/shop/constants/product/product-reviews-data';
import { ALL_REVIEWS } from '@/lib/shop/constants/reviews/reviews-data';
import { ReloadIcon } from '@/lib/shop/icons';
import { type ReplyFormValues } from '@/lib/shop/validation/reply-form';

const PRODUCT_REVIEWS = ALL_REVIEWS.filter(
  (review) => review.product !== 'KROVATO',
);
const REVIEWS_PER_PAGE = 5;

const ProductReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeReplyForm, setActiveReplyForm] = useState<string | null>(null);
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});

  const totalPages = Math.ceil(PRODUCT_REVIEWS.length / REVIEWS_PER_PAGE);
  const visibleReviews = PRODUCT_REVIEWS.slice(
    0,
    currentPage * REVIEWS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleReply = (reviewId: string, authorName: string) => {
    setActiveReplyForm(activeReplyForm === reviewId ? null : reviewId);
  };

  const handleToggleReplies = (reviewId: string) => {
    setShowReplies((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const handleSubmitReply = (data: ReplyFormValues) => {
    console.log('Reply submitted:', data);
    setActiveReplyForm(null);
  };

  const dividerStyles = clsx(
    'h-[2px] w-full bg-light',
    'my-5',
    'md:my-[30px] md:h-[3px]',
  );

  const buttonStyles = clsx(
    'bg-sky gap-3 max-w-73 text-[17px]',
    'md:h-[50px] md:gap-[15px] md:px-[30px] md:text-[19px]',
  );

  return (
    <section>
      <ul className="flex flex-col">
        {visibleReviews.map((review, index) => (
          <li key={review.id}>
            {index > 0 && <div className={dividerStyles} />}

            <ReviewItem
              review={review}
              onReply={handleReply}
              onToggleReplies={handleToggleReplies}
              activeReplyForm={activeReplyForm}
              showReplies={showReplies}
            />

            {showReplies[review.id] && review.replies && (
              <div className="flex flex-col gap-5 py-5 md:py-8">
                <div className="bg-sky h-[2px] md:ml-[100px]" />
                {review.replies.map((reply: Reply) => (
                  <ReplyItem key={reply.id} reply={reply} />
                ))}
              </div>
            )}

            {activeReplyForm === review.id && (
              <div className="py-5">
                <ReplyForm
                  reviewId={review.id}
                  authorName={review.author}
                  onCancel={() => setActiveReplyForm(null)}
                  onSubmit={handleSubmitReply}
                />
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="hidden md:block">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      {currentPage < totalPages && (
        <div className="mt-8 flex justify-center">
          <BtnLoadMore
            onClick={handleShowMore}
            className={buttonStyles}
            icon={<ReloadIcon className="h-5 w-5 md:h-6 md:w-6" />}
          >
            Показати ще відгуки
          </BtnLoadMore>
        </div>
      )}
    </section>
  );
};

export default ProductReviews;
