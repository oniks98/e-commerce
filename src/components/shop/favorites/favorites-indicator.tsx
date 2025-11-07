'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { FavoritesIcon } from '@/lib/shop/icons';

import { useFavoritesStore } from '@/store/favorites-store';

interface FavoritesIndicatorProps {
  locale: string;
}

export default function FavoritesIndicator({
  locale,
}: FavoritesIndicatorProps) {
  const [mounted, setMounted] = useState(false);
  const items = useFavoritesStore((state) => state.items);
  const getTotalItems = useFavoritesStore((state) => state.getTotalItems);

  const totalItems = getTotalItems();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="relative flex items-center justify-center"
        aria-label="Favorites"
      >
        <FavoritesIcon
          className={clsx('text-grey hover:text-sky h-[23px] w-[26px]')}
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center"
      aria-label="Favorites"
    >
      <FavoritesIcon
        className={clsx('text-grey hover:text-sky h-[23px] w-[26px]')}
      />
      {totalItems > 0 && (
        <span className="bg-sky absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </div>
  );
}
