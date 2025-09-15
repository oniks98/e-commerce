import React from 'react';
import Link from 'next/link';

import { catalogData } from '@/lib/shop/constants/catalog-data';
import ChevronRightIcon from '@/lib/shop/icons/ChevronRightIcon';

interface DesktopCatalogMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DesktopCatalogMenu = ({ isOpen, onClose }: DesktopCatalogMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu container */}
      <div className="absolute top-full left-0 z-50 w-full bg-white shadow-lg">
        <div className="mx-auto max-w-7xl">
          <div className="flex w-full">
            {/* Left sidebar with categories */}
            <div className="w-80 border-r border-gray-200 bg-white">
              <div className="py-2">
                {catalogData.map((category) => (
                  <div key={category.id} className="group relative">
                    <Link
                      href={category.href}
                      className="hover:bg-yellow flex items-center justify-between px-8 py-3 text-xl leading-7 font-semibold text-gray-900 transition-colors hover:text-white"
                      onClick={onClose}
                    >
                      <span>{category.name}</span>
                      {category.subcategories &&
                        category.subcategories.length > 0 && (
                          <ChevronRightIcon className="text-yellow h-6 w-6 group-hover:text-white" />
                        )}
                    </Link>

                    {/* Subcategories panel */}
                    {category.subcategories &&
                      category.subcategories.length > 0 && (
                        <div className="absolute top-0 left-full z-[60] hidden min-h-full w-80 bg-gray-50 py-2 group-hover:block">
                          <div className="px-8 py-2">
                            <h3 className="text-xl leading-7 font-semibold text-gray-900">
                              {category.name}
                            </h3>
                            <div className="mt-4 space-y-2">
                              {category.subcategories.map((subcategory) => (
                                <Link
                                  key={subcategory.id}
                                  href={subcategory.href}
                                  className="block text-lg leading-10 text-gray-600 transition-colors hover:text-yellow-600"
                                  onClick={onClose}
                                >
                                  {subcategory.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>

            {/* Yellow separator line */}
            <div className="bg-yellow w-1" />

            {/* Right panel */}
            <div className="bg-light flex-1 p-8">
              <div className="text-center">
                <h2 className="text-dark mb-8 text-[40px] leading-[48px] font-semibold">
                  Популярні категорії
                </h2>
                <p className="text-lg text-gray-500">
                  Оберіть категорію зліва, щоб побачити підкategorії
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopCatalogMenu;
