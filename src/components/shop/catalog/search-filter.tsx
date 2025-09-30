'use client';

import { useState, ReactNode, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import FilterArrowIcon from '@/lib/shop/icons/filter-arrow-icon';
import FilterCrossIcon from '@/lib/shop/icons/filter-cross-icon';
import FilterBarsIcon from '@/lib/shop/icons/filter-bars-icon';
import FilterCheckboxActiveIcon from '@/lib/shop/icons/filter-checkbox-active-icon';
import FilterCheckboxEmptyIcon from '@/lib/shop/icons/filter-checkbox-empty-icon';
import {
  MIN_PRICE,
  MAX_PRICE,
  MANUFACTURERS,
  BED_TYPES,
  SIZES,
} from '@/lib/shop/constants/search-filter-data';

interface FilterSectionProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterSection = ({
  title,
  children,
  isOpen,
  onToggle,
}: FilterSectionProps) => (
  <div className="border-grey-light bg-light border-b">
    <button
      onClick={onToggle}
      className="text-dark flex w-full items-center justify-between p-4 text-left text-lg font-semibold"
    >
      <span>{title}</span>
      <span
        className={clsx('transform transition-transform', {
          'rotate-180': isOpen,
        })}
      >
        <FilterArrowIcon />
      </span>
    </button>
    {isOpen && <div className="bg-white p-4">{children}</div>}
  </div>
);

interface SearchFilterProps {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}

const SearchFilter = ({
  selectedFilters,
  setSelectedFilters,
}: SearchFilterProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleFilterChange = (filter: string) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];
    setSelectedFilters(newFilters);
  };

  const handleMinPriceChange = useCallback(
    (value: number) => {
      setMinPrice((currentMin) => {
        setMaxPrice((currentMax) => {
          const validValue = Math.max(MIN_PRICE, Math.min(value, currentMax));
          return currentMax;
        });
        return Math.max(MIN_PRICE, Math.min(value, maxPrice));
      });
    },
    [maxPrice],
  );

  const handleMaxPriceChange = useCallback(
    (value: number) => {
      setMaxPrice((currentMax) => {
        setMinPrice((currentMin) => {
          const validValue = Math.min(MAX_PRICE, Math.max(value, currentMin));
          return currentMin;
        });
        return Math.min(MAX_PRICE, Math.max(value, minPrice));
      });
    },
    [minPrice],
  );

  const calculatePriceFromPosition = useCallback((clientX: number): number => {
    if (!sliderRef.current) return 0;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width),
    );
    return Math.round(MIN_PRICE + percent * (MAX_PRICE - MIN_PRICE));
  }, []);

  const handleMouseDown = (isMin: boolean) => {
    if (isMin) {
      setIsDraggingMin(true);
    } else {
      setIsDraggingMax(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingMin) {
        const newPrice = calculatePriceFromPosition(e.clientX);
        handleMinPriceChange(newPrice);
      } else if (isDraggingMax) {
        const newPrice = calculatePriceFromPosition(e.clientX);
        handleMaxPriceChange(newPrice);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingMin(false);
      setIsDraggingMax(false);
    };

    if (isDraggingMin || isDraggingMax) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    isDraggingMin,
    isDraggingMax,
    calculatePriceFromPosition,
    handleMinPriceChange,
    handleMaxPriceChange,
  ]);

  const minPricePercent =
    ((minPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const maxPricePercent =
    ((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  return (
    <div className="w-full max-w-75">
      <div className="border-grey-light flex items-center border-b bg-white p-4">
        <FilterBarsIcon />
        <h2 className="text-dark ml-4 text-xl font-semibold">Фільтр пошуку</h2>
      </div>

      <FilterSection
        title="Ціна, грн"
        isOpen={openSection === 'price'}
        onToggle={() => toggleSection('price')}
      >
        <div className="flex items-center justify-between gap-2">
          <input
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => handleMinPriceChange(Number(e.target.value))}
            min={MIN_PRICE}
            max={MAX_PRICE}
            className="w-2/5 rounded-md border border-gray-300 p-2"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="500000"
            value={maxPrice}
            onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
            min={MIN_PRICE}
            max={MAX_PRICE}
            className="border-grey-light w-2/5 rounded-md border p-2"
          />
          <button className="bg-yellow-dark rounded-md px-4 py-2 text-white">
            ОК
          </button>
        </div>
        <div
          ref={sliderRef}
          className="relative mt-6 h-6 cursor-pointer select-none"
        >
          <div className="bg-grey-light absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full"></div>
          <div
            className="bg-yellow-dark absolute top-1/2 h-1 -translate-y-1/2 rounded-full"
            style={{
              left: `${minPricePercent}%`,
              right: `${100 - maxPricePercent}%`,
            }}
          ></div>
          <div
            className="bg-yellow-dark absolute top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer rounded-full border-2 border-white shadow-md transition-transform hover:scale-110"
            style={{ left: `calc(${minPricePercent}% - 10px)` }}
            onMouseDown={() => handleMouseDown(true)}
          ></div>
          <div
            className="bg-yellow-dark absolute top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer rounded-full border-2 border-white shadow-md transition-transform hover:scale-110"
            style={{ left: `calc(${maxPricePercent}% - 10px)` }}
            onMouseDown={() => handleMouseDown(false)}
          ></div>
        </div>
      </FilterSection>

      <FilterSection
        title="Наявність"
        isOpen={openSection === 'availability'}
        onToggle={() => toggleSection('availability')}
      >
        <label className="mb-2 flex items-center">
          <input
            type="checkbox"
            className="hidden"
            checked={selectedFilters.includes('В наявності')}
            onChange={() => handleFilterChange('В наявності')}
          />
          <span className="mr-2">
            {selectedFilters.includes('В наявності') ? (
              <FilterCheckboxActiveIcon />
            ) : (
              <FilterCheckboxEmptyIcon />
            )}
          </span>
          <span>В наявності</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="hidden"
            checked={selectedFilters.includes('Під замовлення')}
            onChange={() => handleFilterChange('Під замовлення')}
          />
          <span className="mr-2">
            {selectedFilters.includes('Під замовлення') ? (
              <FilterCheckboxActiveIcon />
            ) : (
              <FilterCheckboxEmptyIcon />
            )}
          </span>
          <span>Під замовлення</span>
        </label>
      </FilterSection>

      <FilterSection
        title="Виробник"
        isOpen={openSection === 'manufacturer'}
        onToggle={() => toggleSection('manufacturer')}
      >
        {MANUFACTURERS.map((manufacturer) => (
          <label key={manufacturer} className="mb-2 flex items-center">
            <input
              type="checkbox"
              className="hidden"
              checked={selectedFilters.includes(manufacturer)}
              onChange={() => handleFilterChange(manufacturer)}
            />
            <span className="mr-2">
              {selectedFilters.includes(manufacturer) ? (
                <FilterCheckboxActiveIcon />
              ) : (
                <FilterCheckboxEmptyIcon />
              )}
            </span>
            <span>{manufacturer}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection
        title="Тип ліжка"
        isOpen={openSection === 'bedType'}
        onToggle={() => toggleSection('bedType')}
      >
        {BED_TYPES.map((bedType) => (
          <label key={bedType} className="mb-2 flex items-center">
            <input
              type="checkbox"
              className="hidden"
              checked={selectedFilters.includes(bedType)}
              onChange={() => handleFilterChange(bedType)}
            />
            <span className="mr-2">
              {selectedFilters.includes(bedType) ? (
                <FilterCheckboxActiveIcon />
              ) : (
                <FilterCheckboxEmptyIcon />
              )}
            </span>
            <span>{bedType}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection
        title="Розмір спального місця"
        isOpen={openSection === 'size'}
        onToggle={() => toggleSection('size')}
      >
        {SIZES.map((size) => (
          <label key={size} className="mb-2 flex items-center">
            <input
              type="checkbox"
              className="hidden"
              checked={selectedFilters.includes(size)}
              onChange={() => handleFilterChange(size)}
            />
            <span className="mr-2">
              {selectedFilters.includes(size) ? (
                <FilterCheckboxActiveIcon />
              ) : (
                <FilterCheckboxEmptyIcon />
              )}
            </span>
            <span>{size}</span>
          </label>
        ))}
      </FilterSection>
    </div>
  );
};

export default SearchFilter;
