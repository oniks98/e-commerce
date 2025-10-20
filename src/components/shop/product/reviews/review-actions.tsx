import clsx from 'clsx';

import { ChatIcon, CloseIcon, LikeIcon } from '@/lib/shop/icons';

interface RepliesCountBadgeProps {
  count: number;
}

const RepliesCountBadge = ({ count }: RepliesCountBadgeProps) => {
  return (
    <div className="relative h-5 w-5 md:h-6 md:w-6">
      <ChatIcon className="text-yellow h-5 w-5 md:h-6 md:w-6" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[13px] leading-[15.8px] font-bold text-white">
        {count}
      </span>
    </div>
  );
};

interface ReviewActionsProps {
  onReply: () => void;
  onToggleReplies?: () => void;
  isReplyFormActive: boolean;
  hasReplies: boolean;
  repliesCount?: number;
  repliesVisible?: boolean;
  helpfulCount: number;
}

const ReviewActions = ({
  onReply,
  onToggleReplies,
  isReplyFormActive,
  hasReplies,
  repliesCount = 0,
  repliesVisible = false,
  helpfulCount,
}: ReviewActionsProps) => {
  const iconStyles = 'h-5 w-5 md:h-6 md:w-6 text-yellow';
  const buttonStyles =
    'flex items-center gap-[5px] text-[15px] md:text-[17px] text-grey';

  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-[30px]">
      <button onClick={onReply} className={buttonStyles}>
        {isReplyFormActive ? (
          <>
            <CloseIcon className={iconStyles} />
            Передумав
          </>
        ) : (
          <>
            <ChatIcon className={iconStyles} />
            Відповісти
          </>
        )}
      </button>

      {hasReplies && onToggleReplies && (
        <button onClick={onToggleReplies} className={buttonStyles}>
          {repliesVisible ? (
            <>
              <CloseIcon className={iconStyles} />
              Приховати відповіді
            </>
          ) : (
            <>
              <RepliesCountBadge count={repliesCount} />
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
          {helpfulCount}
        </span>
      </div>
    </div>
  );
};

export { RepliesCountBadge };
export default ReviewActions;
