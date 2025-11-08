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
  onMousePositionCheck: (
    menuElement: HTMLElement | null,
  ) => (e: MouseEvent) => void;
}

const DesktopCatalogMenu = ({
  isOpen,
  onClose,
  locale,
  catalogData,
  onMousePositionCheck,
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
  }, [isOpen, hoveredCategory]);

  useEffect(() => {
    if (!isOpen) return;

    const menuElement = menuRef.current;
    const handleMouseMove = onMousePositionCheck(menuElement);

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen, onMousePositionCheck]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? 'visible' : 'invisible'
        }`}
        onClick={onClose}
      />

      <nav
        className={`absolute top-full left-0 z-50 w-full transition-all duration-300 ease-out ${
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-4 opacity-0'
        }`}
        style={{
          height: isOpen ? `${menuHeight}px` : '0px',
        }}
      >
        <div className="mx-auto max-w-[1360px] px-[35px]">
          <div className="w-[920px]">
            <div
              ref={menuRef}
              className={`flex w-full overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ${
                isOpen ? 'scale-100' : 'scale-95'
              }`}
            >
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

              <div
                className={`bg-sky w-[5px] transition-all duration-300 ${
                  isOpen ? 'scale-y-100' : 'scale-y-0'
                }`}
                style={{
                  transitionDelay: '150ms',
                }}
              />

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
