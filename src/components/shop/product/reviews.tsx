'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  PRODUCT_REVIEWS,
  Review,
  Reply,
} from '@/lib/shop/constants/product-reviews-data';
import {
  AccountIcon,
  StarIcon,
  ChatIcon,
  CloseIcon,
  LikeIcon,
  ForwardIcon,
  ReloadIcon,
  ChevronRightIcon,
} from '@/lib/shop/icons';
import Logo from '@/components/shop/ui/logo';

const INITIAL_VISIBLE_REVIEWS = 1;

const replySchema = z.object({
  name: z.string().min(1, "Ім'я обов'язкове"),
  email: z.string().email('Невірний email'),
  review: z.string().min(10, 'Відгук повинен містити мінімум 10 символів'),
});

type ReplyFormValues = z.infer<typeof replySchema>;

interface ReviewItemProps {
  review: Review;
  onReply: (reviewId: string, authorName: string) => void;
  onToggleReplies: (reviewId: string) => void;
  activeReplyForm: string | null;
  showReplies: Record<string, boolean>;
}

function ReviewItem({
  review,
  onReply,
  onToggleReplies,
  activeReplyForm,
  showReplies,
}: ReviewItemProps) {
  const hasReplies = review.replies && review.replies.length > 0;
  const repliesVisible = showReplies[review.id];

  return (
    <div className="mb-5 flex flex-col items-start gap-5 md:flex-row">
      <div className="relative h-[50px] w-[50px] shrink-0">
        <div className="border-yellow absolute inset-0 rounded-full border bg-white" />
        <div className="text-grey absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <AccountIcon className="h-[21.43px] w-[21.43px]" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-wrap items-center gap-5">
          <h3 className="text-dark w-full text-[15px] font-normal md:w-[476px] md:text-[17px]">
            {review.author}
          </h3>
          <div className="flex gap-0.5 md:gap-0">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="text-yellow h-5 w-5 md:h-6 md:w-6" />
            ))}
          </div>
          <span className="text-grey w-auto text-[15px] md:w-[84px] md:text-[17px]">
            {review.date}
          </span>
        </div>

        <p className="text-dark w-full text-base leading-[30px]">
          {review.text}
        </p>

        <div className="flex flex-wrap items-center gap-4 md:gap-[30px]">
          <button
            onClick={() => onReply(review.id, review.author)}
            className="text-grey flex items-center gap-[5px] text-[15px] md:text-[17px]"
          >
            {activeReplyForm === review.id ? (
              <>
                <CloseIcon className="text-yellow h-5 w-5 md:h-6 md:w-6" />
                Передумав
              </>
            ) : (
              <>
                <ChatIcon className="text-yellow h-5 w-5 md:h-6 md:w-6" />
                Відповісти
              </>
            )}
          </button>

          {hasReplies && (
            <button
              onClick={() => onToggleReplies(review.id)}
              className="text-grey flex items-center gap-[5px] text-[15px] md:text-[17px]"
            >
              {repliesVisible ? (
                <>
                  <CloseIcon className="text-yellow h-5 w-5 md:h-6 md:w-6" />
                  Приховати відповіді
                </>
              ) : (
                <>
                  <div className="relative h-5 w-5 md:h-6 md:w-6">
                    <ChatIcon className="text-yellow h-5 w-5 md:h-6 md:w-6" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[13px] leading-[15.8px] font-bold text-white">
                      {review.repliesCount}
                    </span>
                  </div>
                  Показати відповіді
                </>
              )}
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <LikeIcon className="text-yellow h-4 w-4 md:h-5 md:w-5" />
            <span className="text-grey text-[15px] md:text-[17px]">
              Корисний відгук:
            </span>
            <span className="text-grey text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]">
              {review.helpful}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ReplyItemProps {
  reply: Reply;
}

function ReplyItem({ reply }: ReplyItemProps) {
  return (
    <div className="flex flex-col gap-5 md:ml-[70px]">
      <div className="flex items-start gap-5">
        <div className="relative h-[40px] w-[40px] shrink-0 md:h-[50px] md:w-[50px]">
          <div className="border-yellow absolute inset-0 rounded-full border bg-white" />
          {reply.isCompany ? (
            <div className="absolute">
              <Logo />
            </div>
          ) : (
            <div className="text-grey absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <AccountIcon className="h-[18px] w-[18px] md:h-[21.43px] md:w-[21.43px]" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-wrap items-center gap-5">
            <span className="text-dark text-[15px] md:text-[17px]">
              {reply.author}
            </span>
            {reply.replyTo && (
              <>
                <ChevronRightIcon className="text-yellow h-4 w-4 md:h-5 md:w-5" />
                <span className="text-dark text-[17px] font-semibold md:text-[19px]">
                  {reply.replyTo}
                </span>
              </>
            )}
            <span className="text-grey text-base">{reply.date}</span>
          </div>

          <p className="text-dark w-full text-base leading-[30px]">
            {reply.text}
          </p>
        </div>
      </div>
    </div>
  );
}

interface ReplyFormProps {
  reviewId: string;
  authorName: string;
  onCancel: () => void;
  onSubmit: (data: ReplyFormValues) => void;
}

function ReplyForm({
  reviewId,
  authorName,
  onCancel,
  onSubmit,
}: ReplyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
  });

  const handleFormSubmit: SubmitHandler<ReplyFormValues> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="bg-light relative mb-8 rounded-lg p-[30px]">
      <div className="absolute top-5 left-5 h-6 w-6 md:top-[30px] md:left-[30px] md:h-8 md:w-8">
        <ForwardIcon className="text-yellow h-full w-full" />
      </div>

      <h3 className="text-dark absolute top-[23px] left-[50px] text-[15px] md:top-[34px] md:left-[77px] md:text-[17px]">
        Відповідь для {authorName}
      </h3>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mt-[48px] mb-[15px] flex flex-col gap-4 md:mt-[58px] md:mb-[20px] md:flex-row md:gap-[30px]">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Ваше ім'я прізвище"
              {...register('name')}
              className="border-grey-light text-grey placeholder-grey h-[45px] w-full rounded-lg border bg-white px-4 text-sm md:h-[50px] md:px-5 md:text-base"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex-1">
            <input
              type="email"
              placeholder="E-mail"
              {...register('email')}
              className="border-grey-light text-grey placeholder-grey h-[45px] w-full rounded-lg border bg-white px-4 text-sm md:h-[50px] md:px-5 md:text-base"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="py-5">
          <textarea
            placeholder="Відгук"
            {...register('review')}
            className="border-grey-light text-grey placeholder-grey h-[120px] w-full rounded-lg border bg-white px-4 py-2 text-sm md:h-[150px] md:px-5 md:py-2.5 md:text-base"
          />
          {errors.review && (
            <p className="mt-1 text-sm text-red-500">{errors.review.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:gap-[30px]">
          <button
            type="submit"
            className="bg-yellow flex h-[45px] w-full items-center justify-center gap-3 rounded-lg px-5 py-2 text-[17px] font-semibold text-white md:h-[50px] md:w-[160px] md:gap-[15px] md:text-[19px]"
          >
            Відправити
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border-yellow text-yellow flex h-[45px] w-full items-center justify-center gap-3 rounded-lg border px-5 py-2 text-[17px] font-semibold md:h-[50px] md:w-[160px] md:gap-[15px] md:text-[19px]"
          >
            Відмінити
          </button>
        </div>
      </form>
    </div>
  );
}

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

  return (
    <section className="max-w-[920px] rounded-lg bg-white px-4 py-5 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.05)] md:px-[30px] md:py-[30px]">
      <h2 className="text-dark mb-8 text-center text-3xl leading-tight font-semibold md:text-left">
        {`Відгуки про ${productName}`}
      </h2>

      <div className="flex flex-col gap-4 py-5 md:mb-8 md:flex-row md:items-center md:gap-[195px]">
        <div className="flex items-center gap-2.5">
          <span className="text-grey text-[17px]">Всього відгуків:</span>
          <span className="text-grey text-[17px]">93</span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex gap-0">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="text-yellow h-6 w-6" />
            ))}
          </div>
          <span className="text-grey text-[17px]">Середня оцінка 4,5</span>
        </div>
      </div>

      <div className="flex flex-col">
        {visibleReviews.map((review, index) => (
          <div key={review.id}>
            {index > 0 && (
              <div className="bg-light my-5 h-[2px] w-full md:my-[30px] md:h-[3px]" />
            )}

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
                  <button
                    onClick={handleShowMore}
                    className="bg-yellow flex max-w-73 items-center justify-center gap-3 rounded-lg px-6 py-2 text-[17px] font-semibold text-white md:h-[50px] md:gap-[15px] md:px-[30px] md:text-[19px]"
                  >
                    <ReloadIcon className="h-5 w-5 md:h-6 md:w-6" />
                    {hasMoreReviews
                      ? 'Показати ще відгуки'
                      : 'Згорнути всі відгуки'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {!activeReplyForm && PRODUCT_REVIEWS.length > INITIAL_VISIBLE_REVIEWS && (
        <div className="flex justify-center">
          <button
            onClick={handleShowMore}
            className="bg-yellow w-max-73 flex items-center justify-center gap-3 rounded-lg px-6 py-2 text-[17px] font-semibold text-white md:h-[50px] md:gap-[15px] md:px-[30px] md:text-[19px]"
          >
            <ReloadIcon className="h-5 w-5 md:h-6 md:w-6" />
            {hasMoreReviews ? 'Показати ще відгуки' : 'Згорнути всі відгуки'}
          </button>
        </div>
      )}
    </section>
  );
};

export default Reviews;
