'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { PRODUCT_REVIEWS } from '@/lib/shop/constants/product/product-reviews-data';
import ReviewItem from './review-item';
import ReplyItem from './reply-item';
import ReplyForm from './reply-form';
import { type ReplyFormValues } from '@/lib/shop/validation/reply-form';
import BtnLoadMore from '@/components/shop/ui/btn-load-more';
import ReviewsHeader from './reviews-header';
import { ReloadIcon } from '@/lib/shop/icons';

const INITIAL_VISIBLE_REVIEWS = 1;

interface ReviewsProps {
  productName: string;
}

const Reviews = ({ productName }: ReviewsProps) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_REVIEWS);
  const [activeReplyForm, setActiveReplyForm] = useState<string | null>(null);
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});

  const visibleReviews = PRODUCT_REVIEWS.slice(0, visibleCount);
  const hasMoreReviews = visibleCount < PRODUCT_REVIEWS.length;

  const handleShowMore = () => {
    if (visibleCount >= PRODUCT_REVIEWS.length) {
      setVisibleCount(INITIAL_VISIBLE_REVIEWS);
    } else {
      setVisibleCount(PRODUCT_REVIEWS.length);
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

  const containerStyles = clsx(
    'xl:max-w-[920px] rounded-lg bg-white shadow-[0px_0px_15px_0px_rgba(0,0,0,0.05)]',
    'px-4 py-5',
    'md:px-[30px] md:py-[30px]',
  );

  const dividerStyles = clsx(
    'h-[2px] w-full bg-light',
    'my-5',
    'md:my-[30px] md:h-[3px]',
  );

  const buttonStyles = clsx(
    'bg-yellow gap-3 max-w-73 text-[17px]',
    'md:h-[50px] md:gap-[15px] md:px-[30px] md:text-[19px]',
  );

  return (
    <section className={containerStyles}>
      <ReviewsHeader
        productName={productName}
        totalReviews={93}
        averageRating={4.5}
      />

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
                <div className="bg-yellow h-[2px] md:ml-[100px]" />
                {review.replies.map((reply) => (
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

                <div className="flex justify-center">
                  <BtnLoadMore
                    onClick={handleShowMore}
                    className={buttonStyles}
                    icon={<ReloadIcon className="h-5 w-5 md:h-6 md:w-6" />}
                  >
                    {hasMoreReviews
                      ? 'Показати ще відгуки'
                      : 'Згорнути всі відгуки'}
                  </BtnLoadMore>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {!activeReplyForm && PRODUCT_REVIEWS.length > INITIAL_VISIBLE_REVIEWS && (
        <div className="flex justify-center">
          <BtnLoadMore
            onClick={handleShowMore}
            className={buttonStyles}
            icon={<ReloadIcon className="h-5 w-5 md:h-6 md:w-6" />}
          >
            {hasMoreReviews ? 'Показати ще відгуки' : 'Згорнути всі відгуки'}
          </BtnLoadMore>
        </div>
      )}
    </section>
  );
};

export default Reviews;
