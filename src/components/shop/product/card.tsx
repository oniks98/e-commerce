'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { EmblaOptionsType } from 'embla-carousel';

import Carousel from '@/components/shop/ui/carousel';

import {
  StarIcon,
  ChatIcon,
  CheckIcon,
  FavoritesIcon,
  MinusIcon,
  AddIcon,
  CartIcon,
  PhoneIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/lib/shop/icons';
import { getPlaceholder } from '@/lib/shop/media/cloudinary';
import { Tables } from '@/lib/supabase/types/database';

import { useCartStore } from '@/store/cart-store';

type Product = Tables<'products'>;

interface CardProps {
  product: Product;
  locale: string;
  productName: string;
}

const Card = ({ product, locale, productName }: CardProps) => {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [carouselApi, setCarouselApi] = useState<any>(null);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const productSlug =
    typeof product.slug === 'object' &&
    product.slug &&
    (product.slug as any)[locale]
      ? (product.slug as any)[locale]
      : product.id;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: productName,
        price: product.price_uah,
        image: getPlaceholder('product', `${product.id}-0`),
        slug: productSlug,
        sku: product.sku,
      });
    }
    router.push(`/${locale}/cart`);
  };

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setSelectedImage(carouselApi.selectedScrollSnap());
    };

    carouselApi.on('select', onSelect);
    onSelect();

    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  const handleThumbnailClick = (index: number) => {
    if (!carouselApi) return;
    carouselApi.scrollTo(index);
  };

  const carouselOptions: EmblaOptionsType = { loop: true };

  const imageSlides = [...Array(5)].map((_, index) => (
    <div key={index} className="relative aspect-[630/538] w-full">
      <Image
        src={getPlaceholder('product', `${product.id}-${index}`)}
        alt={`${productName} - фото ${index + 1}`}
        fill
        className="rounded-lg object-cover"
        priority={index === 0}
      />
    </div>
  ));

  const prevButton = (
    <button
      type="button"
      className={clsx(
        'absolute top-1/2 left-5 -translate-y-1/2',
        'h-[60px] w-[60px]',
        'flex items-center justify-center',
        'rounded-full bg-white',
        'text-yellow',
        'transition-all duration-200 hover:bg-gray-50',
        'shadow-md',
        'hidden md:flex',
      )}
      aria-label="Previous image"
    >
      <ChevronLeftIcon />
    </button>
  );

  const nextButton = (
    <button
      type="button"
      className={clsx(
        'absolute top-1/2 right-5 -translate-y-1/2',
        'h-[60px] w-[60px]',
        'flex items-center justify-center',
        'rounded-full bg-white',
        'text-yellow',
        'transition-all duration-200 hover:bg-gray-50',
        'shadow-md',
        'hidden md:flex',
      )}
      aria-label="Next image"
    >
      <ChevronRightIcon />
    </button>
  );

  return (
    <section className="grid grid-cols-1 gap-x-5 pt-8 pb-6 lg:grid-cols-2">
      <div>
        <Carousel
          slides={imageSlides}
          options={carouselOptions}
          prevButton={prevButton}
          nextButton={nextButton}
          showDots={false}
          onInit={setCarouselApi}
          className="mb-5"
        />

        <div className="mb-6 flex flex-wrap justify-center gap-3 lg:mb-0">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className="relative h-[100px] w-[100px] shrink-0"
            >
              <Image
                src={getPlaceholder('product', `${product.id}-${index}`)}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className={`rounded-lg border-2 object-cover transition-all ${
                  index === selectedImage
                    ? 'border-yellow'
                    : 'border-grey-light hover:border-grey'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-dark mb-8 text-center text-4xl font-semibold md:text-left">
          {productName}
        </h1>
        <div className="mb-4 flex flex-wrap items-center gap-x-10 gap-y-5">
          <div className="flex items-center gap-x-2.5">
            <CheckIcon className="text-green-500" />
            <span className="text-dark text-sm">В наличии</span>
          </div>
          <div className="flex items-center gap-x-2.5">
            <div className="flex items-center gap-x-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="text-yellow" />
              ))}
            </div>
            <ChatIcon className="text-grey" />
            <span className="text-grey text-sm">93 отзыва</span>
          </div>
        </div>
        <div className="mb-8">
          <span className="text-grey text-sm">Код товару: {product.sku}</span>
        </div>

        <div className="mb-8 rounded-lg bg-white p-5">
          <div className="mb-5 flex flex-wrap items-center justify-center gap-y-5 md:justify-between">
            <div className="flex items-center gap-x-5">
              <span className="text-dark text-4xl font-semibold">
                {product.price_uah} грн.
              </span>
              <span className="text-xl text-red-500 line-through">
                {Math.round(product.price_uah * 1.2)} грн.
              </span>
            </div>
            <button className="flex items-center gap-x-2.5 transition-colors hover:opacity-80">
              <div className="bg-light flex h-12 w-12 items-center justify-center rounded-full">
                <FavoritesIcon className="text-grey" />
              </div>
              <span className="text-grey font-semibold">В обране</span>
            </button>
          </div>
          <div className="border-grey-light mb-5 rounded-2xl border-t-2 opacity-30" />
          <div className="flex flex-wrap items-center justify-center gap-5 lg:justify-start">
            <div className="border-grey-light flex shrink-0 items-center gap-x-2 rounded-lg border px-4 py-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="shrink-0 py-3 transition-colors hover:opacity-60"
                aria-label="Decrease quantity"
              >
                <MinusIcon className="text-grey" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setQuantity(isNaN(value) || value < 1 ? 1 : value);
                }}
                className="text-dark w-20 [appearance:textfield] text-center text-xl font-semibold outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                min="1"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="shrink-0 py-1 transition-colors hover:opacity-60"
                aria-label="Increase quantity"
              >
                <AddIcon className="text-grey" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-yellow hover:bg-opacity-90 flex shrink-0 items-center justify-center gap-x-4 rounded-lg px-8 py-3.5 font-semibold text-white transition-colors"
            >
              <CartIcon />
              Купити
            </button>
          </div>
        </div>
        <div className="bg-light rounded-lg px-5">
          <div className="flex flex-wrap items-center justify-center gap-5 lg:justify-start">
            <div className="flex items-center gap-x-2.5">
              <PhoneIcon className="text-grey" />
              <input
                type="tel"
                placeholder="+380 -- --- -- --"
                className="text-grey placeholder-grey w-31 bg-transparent outline-none"
              />
            </div>
            <button className="border-grey text-grey hover:border-dark hover:text-dark rounded-lg border px-5 py-3 font-semibold transition-colors">
              Купити в 1 клік
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
