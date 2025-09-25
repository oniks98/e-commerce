'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { catalogData } from '@/lib/shop/constants/catalog-data';
import { ChevronDownIcon } from '@/lib/shop/icons';

interface MobileCatalogMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileCatalogMenu = ({ isOpen, onClose }: MobileCatalogMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    } else {
      setMenuHeight(0);
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Menu positioned right below the header */}
      <div
        className={`absolute top-full left-0 z-50 w-full overflow-hidden bg-white shadow-lg transition-all duration-300 ease-out ${
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
        style={{
          height: isOpen ? `${menuHeight}px` : '0px',
          maxHeight: '80vh',
        }}
      >
        <div ref={menuRef} className="overflow-y-auto">
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
                  {category.subcategories &&
                  category.subcategories.length > 0 ? (
                    <>
                      <div className="hover:bg-light/30 flex items-center justify-between px-6 py-3 transition-colors duration-150">
                        <Link
                          href={category.href}
                          onClick={onClose}
                          className="text-dark hover:text-yellow flex items-center gap-4 text-lg leading-7 transition-colors duration-150"
                        >
                          <span>{category.name}</span>
                        </Link>
                        <AccordionTrigger className="!flex-grow-0 !p-2 transition-transform duration-200" />
                      </div>
                      <AccordionContent className="bg-light/30 overflow-hidden pt-0 pb-0 transition-all duration-250 ease-out">
                        <div className="px-6 py-4">
                          {/* Subcategories */}
                          <div className="space-y-2">
                            {category.subcategories.map(
                              (subcategory, subIndex) => (
                                <Link
                                  key={subcategory.id}
                                  href={subcategory.href}
                                  className={`text-dark hover:text-yellow hover:border-yellow animate-fade-in-left block translate-x-2 border-l-2 border-transparent pl-4 text-base leading-8 opacity-0 transition-all duration-150`}
                                  style={{
                                    animationDelay: `${subIndex * 100}ms`,
                                    animationFillMode: 'forwards',
                                  }}
                                  onClick={onClose}
                                >
                                  {subcategory.name}
                                </Link>
                              ),
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </>
                  ) : (
                    // Simple link for categories without subcategories
                    <Link
                      href={category.href}
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
        </div>
      </div>
    </>
  );
};

export default MobileCatalogMenu;
