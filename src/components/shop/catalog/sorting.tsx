'use client';

import { useState } from 'react';
import clsx from 'clsx';

import FilterCrossIcon from '@/lib/shop/icons/filter-cross-icon';
import SortingArrowsIcon from '@/lib/shop/icons/sorting-arrows-icon';
import SortingAngleDownIcon from '@/lib/shop/icons/sorting-angle-down-icon';

const Sorting = () => {
  const [selectedFilters, setSelectedFilters] = useState([
    'Ціна: 1195-9566',
    'В наявності',
    'Виробник: Corners',
    "Без узголов'я",
    '200x210 см',
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState('За зростанням ціни');

  const sortingOptions = [
    'За зростанням ціни',
    'За спаданням ціни',
    'За популярністю',
    'За новизною',
  ];

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div className="max-w-240 py-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="mr-4 text-lg font-semibold">Ви вибрали:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <div
                key={filter}
                className="flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
              >
                <span>{filter}</span>
                <button onClick={() => removeFilter(filter)} className="ml-2">
                  <FilterCrossIcon />
                </button>
              </div>
            ))}
          </div>
          {selectedFilters.length > 0 && (
            <button
              onClick={clearFilters}
              className="ml-4 flex items-center rounded-md bg-yellow-500 px-3 py-1 text-sm text-white"
            >
              <span>Очистити</span>
              <span className="ml-2">
                <FilterCrossIcon />
              </span>
            </button>
          )}
        </div>
        <div className="relative">
          <div className="flex items-center">
            <button className="mr-2">
              <SortingArrowsIcon />
            </button>
            <span className="mr-2 text-lg font-semibold">Сортування:</span>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-grey flex items-center text-lg"
            >
              <span>{sortOption}</span>
              <span className="ml-2">
                <SortingAngleDownIcon />
              </span>
            </button>
          </div>
          {isDropdownOpen && (
            <div className="border-grey-light absolute right-0 z-10 mt-2 w-48 rounded-md border bg-white shadow-lg">
              {sortingOptions.map((option) => (
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
      </div>
    </div>
  );
};

export default Sorting;
