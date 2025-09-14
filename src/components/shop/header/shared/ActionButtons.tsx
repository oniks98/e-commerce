import FavoritesIcon from '@/lib/shop/icons/FavoritesIcon';
import CartIcon from '@/lib/shop/icons/CartIcon';

interface ActionButtonsProps {
  showLabels?: boolean;
  className?: string;
}

const ActionButtons = ({
  showLabels = false,
  className = '',
}: ActionButtonsProps) => {
  return (
    <div className={`flex shrink-0 items-center gap-[20px] ${className}`}>
      <button aria-label="Favorites" className="relative h-[50px] w-[50px]">
        <div className="border-yellow absolute inset-0 rounded-full border-2"></div>
        <FavoritesIcon className="text-grey hover:text-yellow absolute top-1/2 left-1/2 h-[23px] w-[26px] -translate-x-1/2 -translate-y-1/2" />
      </button>

      <button aria-label="Cart" className="relative h-[50px] w-[50px]">
        <div className="border-yellow absolute inset-0 rounded-full border-2"></div>
        <CartIcon className="text-grey hover:text-yellow absolute top-1/2 left-1/2 h-[25px] w-[25px] -translate-x-1/2 -translate-y-1/2" />
      </button>
    </div>
  );
};

export default ActionButtons;
