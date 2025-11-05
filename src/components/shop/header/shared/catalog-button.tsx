import clsx from 'clsx';

import { CatalogIcon } from '@/lib/shop/icons';

interface CatalogButtonProps {
  className?: string;
  size?: 'default' | 'compact';
  onClick?: () => void;
}

const CatalogButton = ({
  className = '',
  size = 'default',
  onClick,
}: CatalogButtonProps) => {
  const isCompact = size === 'compact';

  return (
    <button
      className={clsx(
        'bg-sky flex items-center gap-[10px] rounded-lg px-5',
        'hover:bg-sky-dark font-semibold text-white transition-colors',
        isCompact ? 'py-3' : 'h-[50px] py-3',
        className,
      )}
      onClick={onClick}
    >
      <CatalogIcon className="h-6 w-6" />
      <span>Каталог</span>
    </button>
  );
};

export default CatalogButton;
