import { useForm, SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';

import { ForwardIcon } from '@/lib/shop/icons';
import {
  replySchema,
  type ReplyFormValues,
} from '@/lib/shop/validation/reply-form';

interface ReplyFormProps {
  reviewId: string;
  authorName: string;
  onCancel: () => void;
  onSubmit: (data: ReplyFormValues) => void;
}

const ReplyForm = ({
  reviewId,
  authorName,
  onCancel,
  onSubmit,
}: ReplyFormProps) => {
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

  const inputStyles = clsx(
    'w-full rounded-lg border border-grey-light bg-white text-grey placeholder-grey',
    'px-4 text-sm h-[45px]',
    'md:px-5 md:text-base md:h-[50px]',
  );

  const textareaStyles = clsx(
    'w-full rounded-lg border border-grey-light bg-white text-grey placeholder-grey',
    'px-4 py-2 text-sm h-[120px]',
    'md:px-5 md:py-2.5 md:text-base md:h-[150px]',
  );

  const primaryButtonStyles = clsx(
    'flex items-center justify-center gap-3 rounded-lg bg-yellow px-5 py-2 font-semibold text-white',
    'h-[45px] w-full text-[17px]',
    'md:h-[50px] md:w-[160px] md:gap-[15px] md:text-[19px]',
  );

  const secondaryButtonStyles = clsx(
    'flex items-center justify-center gap-3 rounded-lg border border-yellow px-5 py-2 font-semibold text-yellow',
    'h-[45px] w-full text-[17px]',
    'md:h-[50px] md:w-[160px] md:gap-[15px] md:text-[19px]',
  );

  const headerStyles = clsx(
    'absolute text-dark text-[15px]',
    'top-[23px] left-[50px]',
    'md:top-[34px] md:left-[77px] md:text-[17px]',
  );

  const iconContainerStyles = clsx(
    'absolute h-6 w-6',
    'top-5 left-5',
    'md:top-[30px] md:left-[30px] md:h-8 md:w-8',
  );

  return (
    <div className="bg-light relative mb-8 rounded-lg p-[30px]">
      <div className={iconContainerStyles}>
        <ForwardIcon className="text-yellow h-full w-full" />
      </div>

      <h3 className={headerStyles}>Відповідь для {authorName}</h3>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mt-[48px] mb-[15px] flex flex-col gap-4 md:mt-[58px] md:mb-[20px] md:flex-row md:gap-[30px]">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Ваше ім'я прізвище"
              {...register('name')}
              className={inputStyles}
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
              className={inputStyles}
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
            className={textareaStyles}
          />
          {errors.review && (
            <p className="mt-1 text-sm text-red-500">{errors.review.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:gap-[30px]">
          <button type="submit" className={primaryButtonStyles}>
            Відправити
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={secondaryButtonStyles}
          >
            Відмінити
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
