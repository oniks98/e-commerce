'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { catalogData } from '@/lib/shop/constants/catalog-data';
import { ChevronRightIcon } from '@/lib/shop/icons';

interface DesktopCatalogMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DesktopCatalogMenu = ({ isOpen, onClose }: DesktopCatalogMenuProps) => {
  const defaultCategory =
    catalogData.find((c) => c.subcategories && c.subcategories.length > 0) ||
    catalogData[0];
  const [hoveredCategory, setHoveredCategory] = useState(defaultCategory);

  useEffect(() => {
    if (isOpen) {
      setHoveredCategory(defaultCategory);
    }
  }, [isOpen, defaultCategory]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed top-[138px] right-0 bottom-0 left-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu container wrapper */}
      <div className="absolute top-full left-0 z-50 w-full" onClick={onClose}>
        {/* Container to align with header content */}
        <div className="mx-auto max-w-[1360px]">
          {/* Left-aligned menu with fixed width */}
          <div className="w-[920px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex w-full overflow-hidden rounded-lg bg-white shadow-lg">
              {/* Left sidebar with categories */}
              <div className="w-[500px] bg-white py-2">
                {catalogData.map((category) => (
                  <div
                    key={category.id}
                    onMouseEnter={() => setHoveredCategory(category)}
                  >
                    <Link
                      href={category.href}
                      onClick={onClose}
                      className={clsx(
                        'flex items-center justify-between py-2 pr-[15px] pl-[30px] text-base transition-colors',
                        {
                          'bg-yellow text-white':
                            hoveredCategory?.id === category.id,
                          'hover:bg-yellow/10 text-dark':
                            hoveredCategory?.id !== category.id,
                        },
                      )}
                    >
                      <span className="w-[450px]">{category.name}</span>
                      {category.subcategories &&
                        category.subcategories.length > 0 && (
                          <ChevronRightIcon
                            className={clsx('h-3 w-3', {
                              'text-white': hoveredCategory?.id === category.id,
                              'text-yellow':
                                hoveredCategory?.id !== category.id,
                            })}
                          />
                        )}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Yellow separator line */}
              <div className="bg-yellow w-[5px]" />

              {/* Right panel with subcategories */}
              <div className="bg-light w-[500px] py-[20px] pr-[20px] pl-[30px]">
                {hoveredCategory?.subcategories &&
                hoveredCategory.subcategories.length > 0 ? (
                  <div>
                    {hoveredCategory.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        href={subcategory.href}
                        onClick={onClose}
                        className="text-dark block text-base leading-[2.1] transition-colors hover:text-yellow-600"
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-lg text-gray-500">
                      Для цієї категорії немає підкатегорій.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopCatalogMenu;
