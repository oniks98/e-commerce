'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { getPlaceholder } from '@/lib/shop/media/cloudinary';
import { CheckIcon, CartIcon, FavoritesIcon } from '@/lib/shop/icons';
import { Tables } from '@/lib/supabase/types/database';

type Product = Tables<'products'>;

interface ProductCardProps {
  product: Product;
  locale: string;
}

const ProductCard = ({ product, locale }: ProductCardProps) => {
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

  return (
    <div
      className={clsx(
        'group',
        'relative',
        'flex',
        'min-w-[270px]',
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
      <Link href={`/${productSlug}`} className="flex w-full flex-col">
        <div className="mb-5 flex justify-center">
          <Image
            src={getPlaceholder('product', product.id)}
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
          <button className="bg-grey-light-r mr-2 rounded-full p-3">
            <FavoritesIcon className="text-grey h-6 w-6" />
          </button>
          <button className="bg-yellow rounded-full p-3">
            <CartIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
