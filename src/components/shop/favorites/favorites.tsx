'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import {
  CheckIcon,
  CartIcon,
  FavoritesIcon,
  DeleteIcon,
} from '@/lib/shop/icons';

import { useAuthStore } from '@/store/auth-store';
import { useCartStore } from '@/store/cart-store';
import { useFavoritesStore, FavoriteItem } from '@/store/favorites-store';

interface FavoritesProps {
  locale: string;
}

export default function Favorites({ locale }: FavoritesProps) {
  const { user } = useAuthStore();
  const items = useFavoritesStore((state) => state.items);
  const { toggleItem, handleLogout: clearFavorites } = useFavoritesStore();
  const addToCart = useCartStore((state) => state.addItem);

  const [addingItems, setAddingItems] = useState<Record<string, boolean>>({});

  const handleAddToCart = (item: FavoriteItem) => {
    setAddingItems((prev) => ({ ...prev, [item.id]: true }));

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      slug: item.slug,
      sku: item.sku,
    });

    setTimeout(() => {
      setAddingItems((prev) => ({ ...prev, [item.id]: false }));
    }, 600);
  };

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        slug: item.slug,
        sku: item.sku,
      });
    });
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <FavoritesIcon className="text-grey mb-4 h-24 w-24 opacity-30" />
        <h2 className="text-dark mb-2 text-2xl font-semibold">
          Обрані товари відсутні
        </h2>
        <p className="text-grey mb-6 text-center">
          Додайте товари в обране, щоб побачити їх тут
        </p>
        <Link
          href={`/${locale}`}
          className="bg-sky hover:bg-sky-dark rounded-lg px-6 py-3 font-semibold text-white transition-colors"
        >
          Перейти до каталогу
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-dark text-2xl font-bold">
          Обрані товари ({items.length})
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleAddAllToCart}
            className="bg-sky hover:bg-sky-dark rounded-lg px-4 py-2 font-semibold text-white transition-colors"
          >
            Додати все в кошик
          </button>
          <button
            onClick={clearFavorites}
            className="bg-grey-light-r hover:bg-grey-light text-grey rounded-lg px-4 py-2 font-semibold transition-colors"
          >
            Очистити все
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.id}
            className={clsx(
              'group',
              'relative',
              'flex',
              'flex-col',
              'items-center',
              'rounded-lg',
              'border',
              'border-grey-light-r',
              'bg-white',
              'p-5',
              'shadow-md',
              'transition-shadow',
              'duration-300',
              'hover:shadow-xl',
            )}
          >
            <button
              onClick={() => toggleItem(item, user)}
              className="hover:bg-grey-light-r absolute top-3 right-3 z-10 rounded-full bg-white p-2 shadow-md transition-colors"
              aria-label="Видалити з обраного"
            >
              <DeleteIcon className="text-grey h-5 w-5" />
            </button>

            <Link
              href={`/${item.slug || item.id}`}
              className="flex w-full flex-col"
            >
              <div className="mb-5 flex justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={260}
                  height={220}
                  className="rounded-lg"
                />
              </div>
              <div className="flex w-full flex-col">
                <div className="relative h-[52px] overflow-visible">
                  <h3
                    className={clsx(
                      'text-dark line-clamp-2 text-lg font-semibold',
                      'absolute right-0 bottom-0 left-0',
                      'origin-bottom transition-all duration-300 ease-in-out',
                      'group-hover:z-20 group-hover:line-clamp-none group-hover:bg-white',
                    )}
                  >
                    {item.name}
                  </h3>
                </div>
                <p className="text-grey mb-3 text-sm">{`Код товару: ${item.sku}`}</p>
                <div className="mb-5 flex items-center">
                  <CheckIcon className="h-6 w-6 text-green-500" />
                  <p className="text-dark ml-1 text-sm">В наявності</p>
                </div>
              </div>
            </Link>

            <div className="flex w-full items-center justify-between pt-4">
              <div className="flex flex-col">
                <p className="text-dark text-xl font-semibold">{`${item.price} грн.`}</p>
              </div>
              <button
                onClick={() => handleAddToCart(item)}
                disabled={addingItems[item.id]}
                className={clsx(
                  'bg-sky rounded-full p-3 transition-all',
                  'hover:bg-sky-dark disabled:cursor-not-allowed',
                  addingItems[item.id] && 'scale-110',
                )}
                aria-label="Додати в кошик"
              >
                <CartIcon className="h-6 w-6 text-white" />
              </button>
            </div>

            {addingItems[item.id] && (
              <div className="absolute top-2 left-2 rounded-lg bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                Додано!
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
