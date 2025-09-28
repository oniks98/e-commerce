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
  <div className="border-grey-light border-b">
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
    {isOpen && <div className="p-4">{children}</div>}
  </div>
);

const SearchFilter = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
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
      <div className="border-grey-light flex items-center border-b p-4">
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
          <input type="checkbox" className="hidden" />
          <span className="mr-2">
            <FilterCheckboxEmptyIcon />
          </span>
          <span>В наявності</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="hidden" />
          <span className="mr-2">
            <FilterCheckboxEmptyIcon />
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
            <input type="checkbox" className="hidden" />
            <span className="mr-2">
              <FilterCheckboxEmptyIcon />
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
            <input type="checkbox" className="hidden" />
            <span className="mr-2">
              <FilterCheckboxEmptyIcon />
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
            <input type="checkbox" className="hidden" />
            <span className="mr-2">
              <FilterCheckboxEmptyIcon />
            </span>
            <span>{size}</span>
          </label>
        ))}
      </FilterSection>
    </div>
  );
};

export default SearchFilter;
