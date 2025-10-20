import clsx from 'clsx';

import { Reply } from '@/lib/shop/constants/product/product-reviews-data';
import { ChevronRightIcon } from '@/lib/shop/icons';

import Avatar from './avatar';

interface ReplyItemProps {
  reply: Reply;
}

const ReplyItem = ({ reply }: ReplyItemProps) => {
  const headerStyles = clsx('flex flex-wrap items-center gap-5');

  const authorStyles = clsx('text-[15px] text-dark', 'md:text-[17px]');

  const replyToStyles = clsx(
    'text-[17px] font-semibold text-dark',
    'md:text-[19px]',
  );

  return (
    <article className="flex flex-col gap-5 md:ml-[70px]">
      <div className="flex items-start gap-5">
        <Avatar isCompany={reply.isCompany} size="sm" />

        <div className="flex flex-1 flex-col gap-5">
          <div className={headerStyles}>
            <span className={authorStyles}>{reply.author}</span>

            {reply.replyTo && (
              <>
                <ChevronRightIcon className="text-yellow h-4 w-4 md:h-5 md:w-5" />
                <span className={replyToStyles}>{reply.replyTo}</span>
              </>
            )}

            <span className="text-grey text-base">{reply.date}</span>
          </div>

          <p className="text-dark w-full text-base leading-[30px]">
            {reply.text}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ReplyItem;
