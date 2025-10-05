import clsx from 'clsx';
import { ReloadIcon } from '@/lib/shop/icons';

interface ShowMoreButtonProps {
  onClick: () => void;
  hasMore: boolean;
}

export function ShowMoreButton({ onClick, hasMore }: ShowMoreButtonProps) {
  const buttonStyles = clsx(
    'flex items-center justify-center gap-3 rounded-lg bg-yellow px-6 py-2 font-semibold text-white',
    'max-w-73 text-[17px]',
    'md:h-[50px] md:gap-[15px] md:px-[30px] md:text-[19px]',
  );

  return (
    <div className="flex justify-center">
      <button onClick={onClick} className={buttonStyles}>
        <ReloadIcon className="h-5 w-5 md:h-6 md:w-6" />
        {hasMore ? 'Показати ще відгуки' : 'Згорнути всі відгуки'}
      </button>
    </div>
  );
}
