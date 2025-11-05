'use client';

import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link';

import clsx from 'clsx';

import { CategoryTreeItem } from '@/lib/shop/actions/category';
import { ChevronRightIcon } from '@/lib/shop/icons';

interface DesktopCatalogMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  catalogData: CategoryTreeItem[];
}

const DesktopCatalogMenu = ({
  isOpen,
  onClose,
  locale,
  catalogData,
}: DesktopCatalogMenuProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<
    CategoryTreeItem | undefined
  >(undefined);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (isOpen && catalogData.length > 0) {
      const newDefaultCategory =
        catalogData.find((c) => c.children && c.children.length > 0) ||
        catalogData[0];
      setHoveredCategory(newDefaultCategory);
    } else {
      setHoveredCategory(undefined);
    }
  }, [isOpen, catalogData]);

  useEffect(() => {
    if (isOpen) {
      if (menuRef.current) {
        setMenuHeight(menuRef.current.scrollHeight);
      }
    }
  }, [isOpen, hoveredCategory]); // Recalculate height when hovered category changes

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`bg-dark/50 fixed top-[138px] right-0 bottom-0 left-0 z-40 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Menu container wrapper */}
      <nav
        className={`absolute top-full left-0 z-50 w-full transition-all duration-300 ease-out ${
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-4 opacity-0'
        }`}
        onClick={onClose}
        style={{
          height: isOpen ? `${menuHeight}px` : '0px',
        }}
      >
        {/* Container to align with header content */}
        <div className="mx-auto max-w-[1360px] px-[35px]">
          {/* Left-aligned menu with fixed width */}
          <div className="w-[920px]" onClick={(e) => e.stopPropagation()}>
            <div
              ref={menuRef}
              className={`flex w-full overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ${
                isOpen ? 'scale-100' : 'scale-95'
              }`}
            >
              {/* Left sidebar with categories */}
              <ul className="w-[500px] bg-white py-2">
                {catalogData.map((category, index) => (
                  <li
                    key={category.id}
                    onMouseEnter={() => setHoveredCategory(category)}
                    className={`transform-gpu transition-all duration-200 ${
                      isOpen
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-4 opacity-0'
                    }`}
                    style={{
                      transitionDelay: isOpen ? `${index * 30}ms` : '0ms',
                    }}
                  >
                    <Link
                      href={`/${locale}/catalog/${category.slug}`}
                      onClick={onClose}
                      className={clsx(
                        'flex items-center justify-between py-2 pr-[15px] pl-[30px] text-base transition-all duration-200 hover:translate-x-1',
                        {
                          'bg-sky text-white shadow-md':
                            hoveredCategory?.id === category.id,
                          'hover:bg-sky-dark text-dark':
                            hoveredCategory?.id !== category.id,
                        },
                      )}
                    >
                      <span className="w-[450px]">{category.name}</span>
                      {category.children && category.children.length > 0 && (
                        <ChevronRightIcon
                          className={clsx(
                            'h-3 w-3 transition-all duration-200',
                            {
                              'rotate-0 text-white':
                                hoveredCategory?.id === category.id,
                              'text-sky -rotate-12':
                                hoveredCategory?.id !== category.id,
                            },
                          )}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* sky separator line */}
              <div
                className={`bg-sky w-[5px] transition-all duration-300 ${
                  isOpen ? 'scale-y-100' : 'scale-y-0'
                }`}
                style={{
                  transitionDelay: '150ms',
                }}
              />

              {/* Right panel with subcategories */}
              <div className="bg-light w-[500px] overflow-hidden py-[20px] pr-[20px] pl-[30px]">
                {hoveredCategory?.children &&
                hoveredCategory.children.length > 0 ? (
                  <ul
                    className={`transform-gpu transition-all duration-300 ${
                      isOpen
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-4 opacity-0'
                    }`}
                  >
                    {hoveredCategory.children.map((subcategory, index) => (
                      <li key={subcategory.id}>
                        <Link
                          key={subcategory.id}
                          href={`/${locale}/catalog/${subcategory.slug}`}
                          onClick={onClose}
                          className={`text-dark animate-fade-in-left hover:text-sky-dark block translate-x-4 rounded px-2 py-1 text-base leading-[2.1] opacity-0 transition-all duration-200 hover:translate-x-2 hover:bg-white/50`}
                          style={{
                            animationDelay: `${200 + index * 50}ms`,
                            animationFillMode: 'forwards',
                          }}
                        >
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div
                    className={`flex h-full items-center justify-center transition-all duration-300 ${
                      isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <p className="text-grey text-lg">
                      Для цієї категорії немає підкатегорій.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DesktopCatalogMenu;
