import Image from 'next/image';
import Link from 'next/link';

import { CheckIcon, CartIcon, FavoritesIcon } from '@/lib/shop/icons';

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  old_price?: number;
  image: string;
  in_stock: boolean;
  size: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border-grey-light overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <Link href={`/products/${product.sku}`} className="block">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={220}
          className="w-full object-cover"
        />
      </Link>
      <div className="p-4">
        <div className="mb-2 flex items-center">
          {product.in_stock ? (
            <span className="flex items-center text-sm text-green-600">
              <CheckIcon />
              <span className="ml-1">В наявності</span>
            </span>
          ) : (
            <span className="text-sm text-red-600">Немає в наявності</span>
          )}
        </div>
        <Link
          href={`/products/${product.sku}`}
          className="text-grey hover:text-yellow-dark mb-2 block text-lg font-semibold"
        >
          {product.name}
        </Link>
        <div className="text-grey mb-4 text-sm">Розмір: {product.size}</div>
        <div className="flex items-center justify-between">
          <div>
            {product.old_price && (
              <div className="text-grey text-sm line-through">
                {product.old_price} грн.
              </div>
            )}
            <div className="text-grey text-xl font-semibold">
              {product.price} грн.
            </div>
          </div>
          <div className="flex items-center">
            <button className="hover:bg-grey-light-r rounded-full p-2 transition-colors">
              <FavoritesIcon />
            </button>
            <button className="bg-yellow-dark hover:bg-yellow-dark ml-2 rounded-full p-2 text-white transition-colors">
              <CartIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
