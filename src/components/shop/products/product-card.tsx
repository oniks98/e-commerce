import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { getPlaceholder } from '@/lib/shop/media/cloudinary';
import { products } from '@/lib/shop/constants/products-data';

import { CheckIcon, CartIcon, FavoritesIcon } from '@/lib/shop/icons';

interface ProductCardProps {
  product: (typeof products)[0];
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div
      className={clsx(
        'group',
        'flex',
        'h-[498px]',
        'min-w-[270px]',
        'flex-col',
        'items-center',
        'rounded-lg',
        'border',
        'border-gray-200',
        'bg-white',
        'p-5',
        'shadow-md',
        'transition-transform',
        'duration-300',
        'hover:scale-105',
      )}
    >
      <Link href={`/products/${product.id}`} className="flex flex-col">
        <div className="flex justify-center">
          <Image
            src={getPlaceholder('product', product.image)}
            alt={product.name}
            width={260}
            height={220}
            className="rounded-lg"
          />
        </div>
        <div className="mt-5 flex w-full flex-col">
          <p className="text-sm text-gray-500">{`Розмір: ${product.size}`}</p>
          <h3 className="mt-2 h-[52px] text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center">
            <CheckIcon className="h-6 w-6 text-green-500" />
            <p className="ml-1 text-sm text-gray-900">В наявності</p>
          </div>
        </div>
      </Link>
      <div className="mt-auto flex w-full items-center justify-between">
        <div className="flex flex-col">
          {product.oldPrice && (
            <p className="text-sm text-red-500 line-through">{`${product.oldPrice} грн.`}</p>
          )}
          <p className="text-xl font-semibold text-gray-900">{`${product.price} грн.`}</p>
        </div>
        <div className="flex items-center">
          <button className="mr-2 rounded-full bg-gray-100 p-3">
            <FavoritesIcon className="h-6 w-6 text-gray-500" />
          </button>
          <button className="rounded-full bg-yellow-500 p-3">
            <CartIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
