'use client';

import { useState } from 'react';
import clsx from 'clsx';

import FilterCrossIcon from '@/lib/shop/icons/filter-cross-icon';
import SortingArrowsIcon from '@/lib/shop/icons/sorting-arrows-icon';
import SortingAngleDownIcon from '@/lib/shop/icons/sorting-angle-down-icon';

interface SortingDropdownProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  sortingOptions: string[];
}

const SortingDropdown = ({
  isDropdownOpen,
  setIsDropdownOpen,
  sortOption,
  setSortOption,
  sortingOptions,
}: SortingDropdownProps) => (
  <div className="relative">
    <div className="flex items-center gap-2.5">
      <SortingArrowsIcon />

      <span className="text-dark hidden text-[19px] leading-[24px] font-semibold md:block">
        Сортування:
      </span>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="text-grey flex items-center gap-2.5 text-[17px] leading-[24px]"
      >
        <span>{sortOption}</span>
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
              setSortOption(option);
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
}

const Sorting = ({
  selectedFilters,
  clearFilters,
  removeFilter,
}: SortingProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState('За зростанням ціни');

  const sortingOptions = [
    'За зростанням ціни',
    'За спаданням ціни',
    'За популярністю',
    'За новизною',
  ];

  return (
    <div className="w-full py-4">
      {/* Mobile Layout */}
      <div className="flex flex-col gap-4 md:hidden">
        {/* Selected Filters Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-dark text-[19px] leading-[24px] font-semibold">
            Ви вибрали:
          </h3>
          <div className="flex flex-wrap gap-2">
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

        {/* Sorting Section */}
        <div className="flex justify-end">
          <SortingDropdown
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            sortOption={sortOption}
            setSortOption={setSortOption}
            sortingOptions={sortingOptions}
          />
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden md:block">
        {/* First Row: Labels and Sorting */}
        <div className="flex items-center justify-between">
          <h3 className="text-dark text-[19px] leading-[24px] font-semibold">
            Ви вибрали:
          </h3>
          <SortingDropdown
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            sortOption={sortOption}
            setSortOption={setSortOption}
            sortingOptions={sortingOptions}
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
