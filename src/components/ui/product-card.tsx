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
        'min-w-[270px]',
        'flex-col',
        'items-center',
        'rounded-lg',
        'border',
        'border-grey-light-r',
        'bg-white',
        'p-5',
        'shadow-md',
        'transition-transform',
        'duration-300',
        'hover:scale-105',
      )}
    >
      <Link href={`/products/${product.id}`} className="flex flex-col">
        <div className="mb-5 flex justify-center">
          <Image
            src={getPlaceholder('product', product.image)}
            alt={product.name}
            width={260}
            height={220}
            className="rounded-lg"
          />
        </div>
        <div className="flex w-full flex-col">
          <p className="text-grey mb-3 text-sm">{`Код товару: ${product.code}`}</p>
          <h3 className="text-dark mb-3 h-[52px] text-lg font-semibold">
            {product.name}
          </h3>
          <div className="mb-5 flex items-center">
            <CheckIcon className="h-6 w-6 text-green-500" />
            <p className="text-dark ml-1 text-sm">В наявності</p>
          </div>
        </div>
      </Link>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          {product.oldPrice && (
            <p className="text-sm text-red-500 line-through">{`${product.oldPrice} грн.`}</p>
          )}
          <p className="text-dark text-xl font-semibold">{`${product.price} грн.`}</p>
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
