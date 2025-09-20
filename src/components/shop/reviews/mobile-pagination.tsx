'use client';

import clsx from 'clsx';

interface MobilePaginationProps {
  totalItems: number;
  currentIndex: number;
  onPageChange: (index: number) => void;
}

const MobilePagination = ({
  totalItems,
  currentIndex,
  onPageChange,
}: MobilePaginationProps) => {
  return (
    <div className="mt-[40px] flex flex-col items-center">
      <div className="flex items-center gap-x-2.5">
        {Array.from({ length: totalItems }).map((_, index) => (
          <div
            key={index}
            className={clsx(
              'h-[15px] w-[15px] cursor-pointer rounded-full',
              currentIndex === index ? 'bg-yellow' : 'bg-grey-light',
            )}
            onClick={() => onPageChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MobilePagination;
