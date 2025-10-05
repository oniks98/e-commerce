'use client';

import ProductCard from '@/components/shop/ui/product-card';
import Carousel from '@/components/shop/ui/carousel';
import { ChevronLeftIcon, ChevronRightIcon } from '@/lib/shop/icons';
import { Tables } from '@/lib/supabase/types/database';

type Product = Tables<'products'>;

interface RecommendedProps {
  products: Product[];
}

const PrevButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="text-yellow absolute top-[-90px] right-[80px] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-50"
    aria-label="Previous slide"
  >
    <ChevronLeftIcon />
  </button>
);

const NextButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="text-yellow absolute top-[-90px] right-0 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-50"
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
    <ProductCard key={product.id} product={product} locale="uk" />
  ));

  return (
    <section className="mt-8">
      <h2 className="text-dark mb-8 text-3xl font-semibold">
        З цим товаром також замовляють
      </h2>

      {/* Mobile Carousel */}
      <div className="md:hidden">
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

      {/* Tablet Carousel */}
      <div className="hidden md:block xl:hidden">
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

      {/* Desktop Carousel */}
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
