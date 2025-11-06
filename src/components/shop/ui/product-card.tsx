'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import { CheckIcon, CartIcon, FavoritesIcon } from '@/lib/shop/icons';
import { Tables } from '@/lib/supabase/types/database';

import { useCartStore } from '@/store/cart-store';

type Product = Tables<'products'>;

interface ProductCardProps {
  product: Product;
  locale: string;
  className?: string;
}

const ProductCard = ({ product, locale, className }: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const productName =
    typeof product.name === 'object' &&
    product.name &&
    (product.name as any)[locale]
      ? (product.name as any)[locale]
      : 'Unnamed Product';

  const productSlug =
    typeof product.slug === 'object' &&
    product.slug &&
    (product.slug as any)[locale]
      ? (product.slug as any)[locale]
      : product.id;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);

    addItem({
      id: product.id,
      name: productName,
      price: product.price_uah || 0,
      image: '/images/logo.png',
      slug: productSlug,
      sku: product.sku,
    });
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  return (
    <article
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
        className,
      )}
    >
      <Link href={`/${productSlug}`} className="flex w-full flex-col">
        <div className="mb-5 flex justify-center">
          <Image
            src={'/images/logo.png'}
            alt={productName}
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
              {productName}
            </h3>
          </div>
          <p className="text-grey mb-3 text-sm">{`Код товару: ${product.sku}`}</p>
          <div className="mb-5 flex items-center">
            <CheckIcon className="h-6 w-6 text-green-500" />
            <p className="text-dark ml-1 text-sm">В наявності</p>
          </div>
        </div>
      </Link>
      <div className="flex w-full items-center justify-between pt-4">
        <div className="flex flex-col">
          <p className="text-dark text-xl font-semibold">{`${product.price_uah} грн.`}</p>
        </div>
        <div className="flex items-center">
          <button
            className="bg-grey-light-r hover:bg-grey-light mr-2 rounded-full p-3 transition-colors"
            aria-label="Додати в обране"
          >
            <FavoritesIcon className="text-grey h-6 w-6" />
          </button>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={clsx(
              'bg-sky rounded-full p-3 transition-all',
              'hover:bg-sky-dark disabled:cursor-not-allowed',
              isAdding && 'scale-110',
            )}
            aria-label="Додати в кошик"
          >
            <CartIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="absolute top-2 right-2 rounded-lg bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          Додано!
        </div>
      )}
    </article>
  );
};

export default ProductCard;
