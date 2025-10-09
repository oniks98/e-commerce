'use client';

import { useState } from 'react';
import clsx from 'clsx';

import FilterCrossIcon from '@/lib/shop/icons/filter-cross-icon';
import SortingArrowsIcon from '@/lib/shop/icons/sorting-arrows-icon';
import SortingAngleDownIcon from '@/lib/shop/icons/sorting-angle-down-icon';
import { sortingOptions } from '@/lib/shop/constants/catalog/sorting-data';

interface SortingDropdownProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  sortOrder: string;
  setSortOrder: (option: string) => void;
}

const SortingDropdown = ({
  isDropdownOpen,
  setIsDropdownOpen,
  sortOrder,
  setSortOrder,
}: SortingDropdownProps) => (
  <div className="relative">
    <div className="flex flex-col items-center gap-2.5 lg:flex-row">
      <div className="flex gap-1">
        <SortingArrowsIcon />

        <span className="text-dark text-[19px] leading-[24px] font-semibold">
          Сортування:
        </span>
      </div>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="text-grey flex items-center gap-2.5 text-[17px] leading-[24px]"
      >
        <span>{sortOrder}</span>
        <span
          className={clsx(
            'transition-transform duration-200',
            isDropdownOpen && 'rotate-180',
          )}
        >
          <SortingAngleDownIcon />
        </span>
      </button>
    </div>
    {isDropdownOpen && (
      <div className="border-grey-light absolute right-0 z-10 mt-2 w-48 rounded-md border bg-white shadow-lg">
        {sortingOptions.map((option: string) => (
          <button
            key={option}
            onClick={() => {
              setSortOrder(option);
              setIsDropdownOpen(false);
            }}
            className="text-grey block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            {option}
          </button>
        ))}
      </div>
    )}
  </div>
);

interface SortingProps {
  selectedFilters: string[];
  clearFilters: () => void;
  removeFilter: (filter: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

const Sorting = ({
  selectedFilters,
  clearFilters,
  removeFilter,
  sortOrder,
  setSortOrder,
}: SortingProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full py-4">
      {/* Mobile Layout */}

      {/* Desktop/Tablet Layout */}
      <div className="">
        {/* First Row: Labels and Sorting */}
        <div className="flex items-center justify-between">
          <h3 className="text-dark text-[19px] leading-[24px] font-semibold">
            Ви вибрали:
          </h3>
          <SortingDropdown
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>

        {/* Second Row: Filter Tags */}
        <div className="mt-[30px] flex flex-wrap items-center gap-2">
          {selectedFilters.length > 0 && (
            <button
              onClick={clearFilters}
              className="bg-yellow text-dark flex items-center gap-1.5 rounded-lg px-2.5 py-0.5 text-[15px] leading-[22px]"
            >
              <span>Очистити</span>
              <FilterCrossIcon />
            </button>
          )}
          {selectedFilters.map((filter) => (
            <div
              key={filter}
              className="border-grey-light text-dark flex items-center gap-1.5 rounded-lg border bg-white px-2.5 py-0.5 text-[15px] leading-[22px]"
            >
              <span>{filter}</span>
              <button onClick={() => removeFilter(filter)}>
                <FilterCrossIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sorting;
