import CatalogIcon from '@/lib/shop/icons/CatalogIcon';
import clsx from 'clsx';

interface CatalogButtonProps {
  className?: string;
  size?: 'default' | 'compact';
}

const CatalogButton = ({
  className = '',
  size = 'default',
}: CatalogButtonProps) => {
  const isCompact = size === 'compact';

  return (
    <button
      className={clsx(
        'bg-yellow flex items-center gap-[10px] rounded-lg px-5',
        'hover:bg-yellow-dark font-semibold text-white',
        isCompact ? 'py-3' : 'h-[50px] py-3',
        className,
      )}
    >
      <CatalogIcon className="h-6 w-6" />
      <span>Каталог</span>
    </button>
  );
};

export default CatalogButton;
