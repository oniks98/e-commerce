'use client';

import { useState, ReactNode } from 'react';
import clsx from 'clsx';

import FilterArrowIcon from '@/lib/shop/icons/filter-arrow-icon';
import FilterCrossIcon from '@/lib/shop/icons/filter-cross-icon';
import FilterBarsIcon from '@/lib/shop/icons/filter-bars-icon';
import FilterCheckboxActiveIcon from '@/lib/shop/icons/filter-checkbox-active-icon';
import FilterCheckboxEmptyIcon from '@/lib/shop/icons/filter-checkbox-empty-icon';

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

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleFilterChange = (filter: string) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];
    setSelectedFilters(newFilters);
  };

  const manufacturers = [
    'Corners',
    'Estella',
    'Green Line',
    'Legko',
    'MiroMark',
  ];
  const bedTypes = [
    "Без узголов'я",
    "З узголів'ям",
    'Двоярусні',
    'Розкладачки',
    'Шафи',
  ];
  const sizes = [
    '200x210 см',
    '200x200 см',
    '180x200 см',
    '160x200 см',
    '110x190 см',
  ];

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
        <div className="flex items-center justify-between">
          <input
            type="number"
            placeholder="1195"
            className="w-2/5 rounded-md border border-gray-300 p-2"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="9566"
            className="border-grey-light w-2/5 rounded-md border p-2"
          />
          <button className="bg-yellow-dark rounded-md px-4 py-2 text-white">
            ОК
          </button>
        </div>
        {/* Placeholder for range slider */}
        <div className="bg-grey-light relative mt-4 h-1 w-full rounded-full">
          <div
            className="bg-yellow-dark absolute h-1 rounded-full"
            style={{ left: '10%', width: '80%' }}
          ></div>
          <div
            className="bg-yellow-dark absolute -top-1.5 h-4 w-4 rounded-full border-2 border-white"
            style={{ left: '10%' }}
          ></div>
          <div
            className="bg-yellow-dark absolute -top-1.5 h-4 w-4 rounded-full border-2 border-white"
            style={{ left: '90%' }}
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
        {manufacturers.map((manufacturer) => (
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
        {bedTypes.map((bedType) => (
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
        {sizes.map((size) => (
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
