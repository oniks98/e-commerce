import Link from 'next/link';

import { AddIcon, ChatIcon } from '@/lib/shop/icons';

const ReviewActions = () => {
  return (
    <div className="mb-8 flex flex-col items-center justify-center gap-5 md:flex-row xl:justify-start">
      <button className="bg-sky hover:bg-sky-dark flex h-[50px] items-center justify-center rounded-lg px-3 text-white">
        <AddIcon />
        <span className="ml-[15px] text-lg font-semibold">Написати відгук</span>
      </button>

      <Link
        href="/reviews"
        className="w-full max-w-[345px] md:w-auto md:max-w-none"
      >
        <button className="text-grey flex h-[50px] w-full items-center justify-center">
          <ChatIcon />
          <span className="ml-[15px] text-lg font-semibold">Всі відгуки</span>
        </button>
      </Link>
    </div>
  );
};

export default ReviewActions;
