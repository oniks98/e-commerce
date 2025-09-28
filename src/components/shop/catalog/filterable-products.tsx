'use client';

import { useState } from 'react';

import SearchFilter from './search-filter';
import Sorting from './sorting';
import Products from './products';
import BtnLoadMore from '@/components/ui/btn-load-more';
import Pagination from '@/components/shop/catalog/pagination';

const FilterableProducts = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  return (
    <div className="flex gap-[30px] py-9">
      <SearchFilter
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div className="w-full">
        <Sorting
          selectedFilters={selectedFilters}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
        />
        <Products />
        <div className="my-8 flex justify-center">
          <BtnLoadMore>Показати ще товари</BtnLoadMore>
        </div>
        <Pagination
          totalPages={18} // TODO: get total pages
        />
      </div>
    </div>
  );
};

export default FilterableProducts;
