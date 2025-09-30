'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchFilter from '@/components/shop/catalog/search-filter';
import Sorting from '@/components/shop/catalog/sorting';
import Products from '@/components/shop/catalog/products';
import BtnLoadMore from '@/components/ui/btn-load-more';
import Pagination from '@/components/shop/catalog/pagination';
import { Tables } from '@/lib/supabase/types/database';
import { sortingOptions } from '@/lib/shop/constants/sorting-data';

type Product = Tables<'products'>;

interface FilterableProductsProps {
  initialProducts: Product[];
  locale: string;
}

const productsPerPage = 18;

const FilterableProducts = ({
  initialProducts,
  locale,
}: FilterableProductsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [pageToLoadNext, setPageToLoadNext] = useState(2);
  const [sortOrder, setSortOrder] = useState(sortingOptions[0]);

  const sortedProducts = useMemo(() => {
    const sortableProducts = [...initialProducts];
    switch (sortOrder) {
      case 'За зростанням ціни':
        return sortableProducts.sort(
          (a, b) => (a.price_uah ?? 0) - (b.price_uah ?? 0),
        );
      case 'За спаданням ціни':
        return sortableProducts.sort(
          (a, b) => (b.price_uah ?? 0) - (a.price_uah ?? 0),
        );
      case 'За популярністю':
        // TODO: Implement sorting by popularity
        return sortableProducts;
      case 'За новизною':
        return sortableProducts.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
      case 'Наявність':
        return sortableProducts.sort(
          (a, b) => (b.visible ? 1 : 0) - (a.visible ? 1 : 0),
        );
      default:
        return sortableProducts;
    }
  }, [initialProducts, sortOrder]);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setDisplayedProducts(sortedProducts.slice(startIndex, endIndex));
    setPageToLoadNext(currentPage + 1);
  }, [currentPage, sortedProducts]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;

      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', page.toString());
      }

      const newUrl = `?${params.toString()}`;
      router.push(newUrl, { scroll: false });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [router, searchParams, totalPages],
  );

  const loadMoreProducts = () => {
    if (pageToLoadNext > totalPages) return;

    const startIndex = (pageToLoadNext - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const newProducts = sortedProducts.slice(startIndex, endIndex);
    setDisplayedProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setPageToLoadNext((prev) => prev + 1);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  const canLoadMore =
    pageToLoadNext <= totalPages &&
    displayedProducts.length < sortedProducts.length;

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
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <Products products={displayedProducts} locale={locale} />
        {canLoadMore && (
          <div className="mt-10 mb-8 flex justify-center">
            <BtnLoadMore onClick={loadMoreProducts}>
              Показати ще{' '}
              {Math.min(
                productsPerPage,
                sortedProducts.length - displayedProducts.length,
              )}{' '}
              товарів
            </BtnLoadMore>
          </div>
        )}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default FilterableProducts;
