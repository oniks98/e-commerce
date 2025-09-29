'use client';

import { useState } from 'react';
import SearchFilter from '@/components/shop/catalog/search-filter';
import Sorting from '@/components/shop/catalog/sorting';
import Products from '@/components/shop/catalog/products';
import BtnLoadMore from '@/components/ui/btn-load-more';
import Pagination from '@/components/shop/catalog/pagination';
import { Tables } from '@/lib/supabase/types/database';

type Product = Tables<'products'>;

interface FilterableProductsProps {
  initialProducts: Product[];
  locale: string;
}

const FilterableProducts = ({
  initialProducts,
  locale,
}: FilterableProductsProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  // TODO: Add logic to filter products based on selectedFilters

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  const productsPerPage = 12;
  const totalPages = Math.ceil(initialProducts.length / productsPerPage);

  return (
    <div className="flex flex-col lg:flex-row">
      <SearchFilter
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div className="w-full lg:pl-8">
        <Sorting
          selectedFilters={selectedFilters}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
        />
        <Products products={initialProducts} locale={locale} />
        <div className="mt-10 mb-8 flex justify-center">
          <BtnLoadMore onClick={() => alert('TODO: Load more products')}>
            Показати ще 32 товари
          </BtnLoadMore>
        </div>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default FilterableProducts;
