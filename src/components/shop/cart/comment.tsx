'use client';

import { CommentIcon } from '@/lib/shop/icons';

const Comment = () => {
  return (
    <section className="w-full max-w-[680px]">
      <div className="mb-[30px] flex items-center gap-[15px]">
        <div className="bg-yellow flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full">
          <CommentIcon className="h-[36px] w-[36px] text-white" />
        </div>
        <h3 className="text-dark text-2xl font-semibold md:text-xl">
          Коментар до замовлення
        </h3>
      </div>
      <textarea
        placeholder="Ваш коментар"
        className="border-grey-light text-grey placeholder:text-grey h-[150px] w-full rounded-lg border bg-white p-5 text-base"
      />
    </section>
  );
};

export default Comment;
