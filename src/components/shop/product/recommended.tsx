'use client';

import Carousel from '@/components/shop/ui/carousel';
import ProductCard from '@/components/shop/ui/product-card';

import { ChevronLeftIcon, ChevronRightIcon } from '@/lib/shop/icons';
import { Tables } from '@/lib/supabase/types/database';

type Product = Tables<'products'>;

interface RecommendedProps {
  products: Product[];
}

const PrevButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="text-sky absolute top-[-90px] right-[80px] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-50"
    aria-label="Previous slide"
  >
    <ChevronLeftIcon />
  </button>
);

const NextButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="text-sky absolute top-[-90px] right-0 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-50"
    aria-label="Next slide"
  >
    <ChevronRightIcon />
  </button>
);

const Recommended = ({ products }: RecommendedProps) => {
  if (products.length === 0) {
    return null;
  }

  const slides = products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      locale="uk"
      className="w-full"
    />
  ));

  return (
    <section className="py-[35px]">
      <h2 className="text-dark mb-8 py-3 text-center text-4xl font-semibold md:text-left">
        З цим товаром також замовляють
      </h2>

      {/* Mobile Carousel */}
      <div className="sm:hidden">
        <Carousel
          slides={slides}
          options={{
            loop: true,
            align: 'start',
            slidesToScroll: 1,
            perPage: 1,
          }}
          showDots={false}
        />
      </div>

      {/* Mobile Carousel */}
      <div className="hidden sm:block md:hidden">
        <Carousel
          slides={slides}
          options={{
            loop: true,
            align: 'start',
            slidesToScroll: 1,
            perPage: 2,
            gap: 30,
          }}
          showDots={false}
        />
      </div>

      {/* Tablet Carousel */}
      <div className="hidden md:block lg:hidden">
        <Carousel
          slides={slides}
          options={{
            loop: true,
            align: 'start',
            slidesToScroll: 1,
            perPage: 2,
            gap: 30,
          }}
          prevButton={<PrevButton />}
          nextButton={<NextButton />}
          showDots={false}
        />
      </div>

      {/* Desktop-lg Carousel */}
      <div className="hidden lg:block xl:hidden">
        <Carousel
          slides={slides}
          options={{
            loop: true,
            align: 'start',
            slidesToScroll: 1,
            perPage: 3,
            gap: 30,
          }}
          prevButton={<PrevButton />}
          nextButton={<NextButton />}
          showDots={false}
        />
      </div>

      {/* Desktop-xl Carousel */}
      <div className="hidden xl:block">
        <Carousel
          slides={slides}
          options={{
            loop: true,
            align: 'start',
            slidesToScroll: 1,
            perPage: 4,
            gap: 30,
          }}
          prevButton={<PrevButton />}
          nextButton={<NextButton />}
          showDots={false}
        />
      </div>
    </section>
  );
};

export default Recommended;
