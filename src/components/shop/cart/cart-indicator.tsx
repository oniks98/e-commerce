'use client';

import { useCartStore } from '@/store/cart-store';
import { CartIcon } from '@/lib/shop/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface CartIndicatorProps {
  locale: string;
}

export default function CartIndicator({ locale }: CartIndicatorProps) {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const totalItems = getTotalItems();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="relative flex items-center justify-center"
        aria-label="Cart"
      >
        <CartIcon
          className={clsx('text-grey hover:text-yellow h-[25px] w-[25px]')}
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center"
      aria-label="Cart"
    >
      <CartIcon
        className={clsx('text-grey hover:text-yellow h-[25px] w-[25px]')}
      />
      {totalItems > 0 && (
        <span className="bg-green absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </div>
  );
}
