import clsx from 'clsx';
import { StarIcon } from '@/lib/shop/icons';

interface StarRatingProps {
  rating?: number;
  size?: 'sm' | 'md';
  showCount?: boolean;
  count?: number;
}

export function StarRating({
  rating = 5,
  size = 'md',
  showCount,
  count,
}: StarRatingProps) {
  const starStyles = clsx(
    'text-yellow',
    size === 'md' && 'h-5 w-5 md:h-6 md:w-6',
    size === 'sm' && 'h-4 w-4 md:h-5 md:w-5',
  );

  const containerStyles = clsx(
    'flex items-center',
    size === 'md' && 'gap-0.5 md:gap-0',
    size === 'sm' && 'gap-0',
  );

  return (
    <div className={containerStyles}>
      <div className="flex gap-0">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className={starStyles} />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-grey ml-2.5 text-[15px] md:text-[17px]">
          {count}
        </span>
      )}
    </div>
  );
}
