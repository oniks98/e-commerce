'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import clsx from 'clsx';

import CartIndicator from '@/components/shop/cart/cart-indicator';
import FavoritesIndicator from '@/components/shop/favorites/favorites-indicator';

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
      <Link
        href={`/${locale}/favorites`}
        aria-label="Favorites"
        className="relative h-[50px] w-[50px]"
      >
        <div className="border-sky absolute inset-0 rounded-full border-2"></div>
        <div
          className={clsx(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          )}
        >
          <FavoritesIndicator locale={locale} />
        </div>
      </Link>

      <Link
        href={`/${locale}/cart`}
        aria-label="Cart"
        className="relative h-[50px] w-[50px]"
      >
        <div className="border-sky absolute inset-0 rounded-full border-2"></div>
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
