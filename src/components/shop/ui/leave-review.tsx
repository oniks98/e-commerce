'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

import { StarOutlineIcon } from '@/lib/shop/icons';
import {
  reviewSchema,
  type ReviewFormValues,
} from '@/lib/shop/validation/leave-review';

const LeaveReview = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit: SubmitHandler<ReviewFormValues> = (data) => {
    console.log(data);
  };

  return (
    <section>
      <div className="rounded-lg bg-white p-8">
        <h2 className="text-dark text-center text-4xl font-semibold md:text-left">
          Залишіть свій відгук
        </h2>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <input
                type="text"
                placeholder="Ваше ім'я прізвище"
                {...register('name')}
                className="border-grey-light text-grey placeholder-grey w-full rounded-lg border bg-white px-5 py-2.5"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="E-mail"
                {...register('email')}
                className="border-grey-light text-grey placeholder-grey w-full rounded-lg border bg-white px-5 py-2.5"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <textarea
            placeholder="Відгук"
            {...register('review')}
            className="border-grey-light text-grey placeholder-grey mt-5 h-36 w-full rounded-lg border bg-white px-5 py-2.5"
          ></textarea>
          {errors.review && (
            <p className="mt-1 text-sm text-red-500">{errors.review.message}</p>
          )}
          <div className="mt-8 flex flex-col items-center gap-2.5">
            <span className="text-grey font-semibold">Ваша оцінка:</span>

            <div className="flex items-center gap-x-1">
              {[...Array(5)].map((_, i) => (
                <StarOutlineIcon key={i} className="text-grey-light" />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-sky mt-8 w-full rounded-lg py-3.5 font-semibold text-white"
          >
            Залишити відгук
          </button>
        </form>
      </div>
    </section>
  );
};

export default LeaveReview;
