'use client';

import React from 'react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shop/ui/accordion';
import { ChevronDownIcon } from '@/lib/shop/icons';
import { CategoryTreeItem } from '@/lib/shop/actions/category';

interface MobileCatalogMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  catalogData: CategoryTreeItem[];
}

const MobileCatalogMenu = ({
  isOpen,
  onClose,
  locale,
  catalogData,
}: MobileCatalogMenuProps) => {
  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`bg-dark/50 fixed inset-0 z-40 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Menu positioned right below the header */}
      <nav
        className={`absolute top-full left-0 z-50 w-full overflow-y-auto bg-white shadow-lg transition-all duration-300 ease-out ${
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
        style={{
          maxHeight: 'calc(100vh - 150px)', // Adjust 150px to be the height of your header
        }}
      >
        <div className="py-3">
          <Accordion type="single" collapsible className="w-full">
            {catalogData.map((category, index) => (
              <AccordionItem
                key={category.id}
                value={category.id}
                className={`border-light border-b transition-all duration-200 last:border-b-0 ${
                  isOpen
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-4 opacity-0'
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                }}
              >
                {category.children && category.children.length > 0 ? (
                  <>
                    <div className="hover:bg-light/30 flex items-center justify-between px-6 py-3 transition-colors duration-150">
                      <Link
                        href={`/${locale}/catalog/${category.slug}`}
                        onClick={onClose}
                        className="text-dark hover:text-yellow flex flex-1 items-center gap-4 text-lg leading-7 transition-colors duration-150"
                      >
                        <span>{category.name}</span>
                      </Link>
                      <AccordionTrigger className="!flex-grow-0 !p-2 transition-transform duration-200" />
                    </div>
                    <AccordionContent className="bg-light/30 overflow-hidden pt-0 pb-0 transition-all duration-250 ease-out">
                      <div className="px-6 py-4">
                        {/* Subcategories */}
                        <ul className="space-y-2">
                          {category.children.map((subcategory, subIndex) => (
                            <li key={subcategory.id}>
                              <Link
                                key={subcategory.id}
                                href={`/${locale}/catalog/${subcategory.slug}`}
                                className={`text-dark hover:text-yellow hover:border-yellow animate-fade-in-left block translate-x-2 border-l-2 border-transparent pl-4 text-base leading-8 opacity-0 transition-all duration-150`}
                                style={{
                                  animationDelay: `${subIndex * 100}ms`,
                                  animationFillMode: 'forwards',
                                }}
                                onClick={onClose}
                              >
                                {subcategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </>
                ) : (
                  // Simple link for categories without subcategories
                  <Link
                    href={`/${locale}/catalog/${category.slug}`}
                    className="text-dark hover:bg-light flex items-center justify-between px-6 py-3 text-lg leading-7 transition-all duration-150 hover:translate-x-1"
                    onClick={onClose}
                  >
                    <div className="flex items-center gap-4">
                      <span>{category.name}</span>
                    </div>
                    <ChevronDownIcon className="text-yellow h-3 w-3 rotate-[-90deg] transition-transform duration-200 hover:rotate-0" />
                  </Link>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </nav>
    </>
  );
};

export default MobileCatalogMenu;
