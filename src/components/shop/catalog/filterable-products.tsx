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
import {
  MANUFACTURERS,
  BED_TYPES,
  SIZES,
} from '@/lib/shop/constants/search-filter-data';

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
  const [priceRange, setPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = [...initialProducts];

    // Price range filter
    if (priceRange) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          (product.price_uah ?? 0) >= priceRange.min &&
          (product.price_uah ?? 0) <= priceRange.max,
      );
    }

    // Checkbox filters
    if (selectedFilters.length > 0) {
      const filterGroups = {
        availability: selectedFilters.filter(
          (f) => f === 'В наявності' || f === 'Під замовлення',
        ),
        manufacturers: selectedFilters.filter((f) => MANUFACTURERS.includes(f)),
        bedTypes: selectedFilters.filter((f) => BED_TYPES.includes(f)),
        sizes: selectedFilters.filter((f) => SIZES.includes(f)),
      };

      filteredProducts = filteredProducts.filter((product) => {
        const name = product.name as { uk: string; en: string };

        const availabilityMatch =
          filterGroups.availability.length === 0 ||
          filterGroups.availability.some((f) =>
            f === 'В наявності' ? product.visible : !product.visible,
          );

        const manufacturerMatch =
          filterGroups.manufacturers.length === 0 ||
          filterGroups.manufacturers.some((f) =>
            name.uk.toLowerCase().includes(f.toLowerCase()),
          );

        const bedTypeMatch =
          filterGroups.bedTypes.length === 0 ||
          filterGroups.bedTypes.some((f) => {
            // TODO: Implement when data is available
            return false;
          });

        const sizeMatch =
          filterGroups.sizes.length === 0 ||
          filterGroups.sizes.some((f) => {
            // TODO: Implement when data is available
            return false;
          });

        return (
          availabilityMatch && manufacturerMatch && bedTypeMatch && sizeMatch
        );
      });
    }

    switch (sortOrder) {
      case 'За зростанням ціни':
        return filteredProducts.sort(
          (a, b) => (a.price_uah ?? 0) - (b.price_uah ?? 0),
        );
      case 'За спаданням ціни':
        return filteredProducts.sort(
          (a, b) => (b.price_uah ?? 0) - (a.price_uah ?? 0),
        );
      case 'За популярністю':
        // TODO: Implement sorting by popularity
        return filteredProducts;
      case 'За новизною':
        return filteredProducts.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
      case 'Наявність':
        return filteredProducts.sort(
          (a, b) => (b.visible ? 1 : 0) - (a.visible ? 1 : 0),
        );
      default:
        return filteredProducts;
    }
  }, [initialProducts, sortOrder, priceRange, selectedFilters]);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / productsPerPage,
  );

  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setDisplayedProducts(filteredAndSortedProducts.slice(startIndex, endIndex));
    setPageToLoadNext(currentPage + 1);
  }, [currentPage, filteredAndSortedProducts]);

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
    const newProducts = filteredAndSortedProducts.slice(startIndex, endIndex);
    setDisplayedProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setPageToLoadNext((prev) => prev + 1);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setPriceRange(null);
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  const canLoadMore =
    pageToLoadNext <= totalPages &&
    displayedProducts.length < filteredAndSortedProducts.length;

  return (
    <div className="flex flex-col items-center gap-7 md:flex-row md:items-start">
      <SearchFilter
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        setPriceRange={setPriceRange}
      />
      <div className="w-full">
        <Sorting
          selectedFilters={selectedFilters}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <Products products={displayedProducts} locale={locale} />
        {canLoadMore && (
          <div className="mt-10 flex justify-center">
            <BtnLoadMore onClick={loadMoreProducts}>
              Показати ще{' '}
              {Math.min(
                productsPerPage,
                filteredAndSortedProducts.length - displayedProducts.length,
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
