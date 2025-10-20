import clsx from 'clsx';

import { Review } from '@/lib/shop/constants/product/product-reviews-data';

import Avatar from './avatar';
import ReviewActions from './review-actions';
import StarRating from './star-rating';

interface ReviewItemProps {
  review: Review;
  onReply: (reviewId: string, authorName: string) => void;
  onToggleReplies: (reviewId: string) => void;
  activeReplyForm: string | null;
  showReplies: Record<string, boolean>;
}

const ReviewItem = ({
  review,
  onReply,
  onToggleReplies,
  activeReplyForm,
  showReplies,
}: ReviewItemProps) => {
  const hasReplies = !!(review.replies && review.replies.length > 0);
  const repliesVisible = showReplies[review.id];
  const isReplyFormActive = activeReplyForm === review.id;

  const headerStyles = clsx(
    'flex flex-wrap items-center justify-between gap-5',
  );

  const authorStyles = clsx(
    'w-full text-[15px] font-normal text-dark',
    'md:w-[150px] md:text-[17px]',
  );

  const dateStyles = clsx(
    'w-auto text-[15px] text-grey',
    'md:w-[84px] md:text-[17px]',
  );

  return (
    <article className="mb-5 flex flex-col items-start gap-5 md:flex-row">
      <Avatar />

      <div className="flex flex-1 flex-col gap-5">
        <div className={headerStyles}>
          <h3 className={authorStyles}>{review.author}</h3>
          <div className="flex gap-5">
            <StarRating />
            <span className={dateStyles}>{review.date}</span>
          </div>
        </div>

        <p className="text-dark w-full text-base leading-[30px]">
          {review.text}
        </p>

        <ReviewActions
          onReply={() => onReply(review.id, review.author)}
          onToggleReplies={
            hasReplies ? () => onToggleReplies(review.id) : undefined
          }
          isReplyFormActive={isReplyFormActive}
          hasReplies={hasReplies}
          repliesCount={review.repliesCount}
          repliesVisible={repliesVisible}
          helpfulCount={review.helpful}
        />
      </div>
    </article>
  );
};

export default ReviewItem;
