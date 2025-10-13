'use client';

import { FavoritesIcon } from '@/lib/shop/icons';
import CartIndicator from '@/components/shop/cart/cart-indicator';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface ActionButtonsProps {
  showLabels?: boolean;
  className?: string;
}

const ActionButtons = ({
  showLabels = false,
  className = '',
}: ActionButtonsProps) => {
  const params = useParams();
  const locale = (params?.locale as string) || 'uk';

  return (
    <nav
      className={`flex shrink-0 items-center gap-2 ${className}`}
      aria-label="User actions"
    >
      <button aria-label="Favorites" className="relative h-[50px] w-[50px]">
        <div className="border-yellow absolute inset-0 rounded-full border-2"></div>
        <FavoritesIcon className="text-grey hover:text-yellow absolute top-1/2 left-1/2 h-[23px] w-[26px] -translate-x-1/2 -translate-y-1/2" />
      </button>

      <Link
        href={`/${locale}/cart`}
        aria-label="Cart"
        className="relative h-[50px] w-[50px]"
      >
        <div className="border-yellow absolute inset-0 rounded-full border-2"></div>
        <div
          className={clsx(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          )}
        >
          <CartIndicator locale={locale} />
        </div>
      </Link>
    </nav>
  );
};

export default ActionButtons;
