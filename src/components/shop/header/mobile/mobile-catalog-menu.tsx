'use client';

import React from 'react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { catalogData } from '@/lib/shop/constants/catalog-data';
import ChevronDownIcon from '@/lib/shop/icons/ChevronDownIcon';

interface MobileCatalogMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileCatalogMenu = ({ isOpen, onClose }: MobileCatalogMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu positioned right below the header */}
      <div className="absolute top-full left-0 z-50 w-full bg-white shadow-lg">
        <div className="max-h-[80vh] overflow-y-auto">
          <div className="py-3">
            <Accordion type="single" collapsible className="w-full">
              {catalogData.map((category) => (
                <AccordionItem
                  key={category.id}
                  value={category.id}
                  className="border-light border-b last:border-b-0"
                >
                  {category.subcategories &&
                  category.subcategories.length > 0 ? (
                    <>
                      <AccordionTrigger className="text-dark hover:bg-light flex items-center justify-between px-6 py-3 text-lg leading-7 font-semibold transition-colors hover:no-underline">
                        <div className="flex items-center gap-4">
                          {/* Icon placeholder */}
                          <div className="bg-light border-grey-light flex h-8 w-8 items-center justify-center rounded-lg border">
                            <div className="bg-yellow h-4 w-4 rounded-sm" />
                          </div>
                          <span>{category.name}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-light/30 pt-0 pb-0">
                        <div className="px-6 py-4">
                          {/* Main category link */}
                          <Link
                            href={category.href}
                            className="text-dark hover:text-yellow mb-4 block text-lg leading-7 font-semibold transition-colors"
                            onClick={onClose}
                          >
                            Всі {category.name.toLowerCase()}
                          </Link>

                          {/* Subcategories */}
                          <div className="space-y-2">
                            {category.subcategories.map((subcategory) => (
                              <Link
                                key={subcategory.id}
                                href={subcategory.href}
                                className="text-grey hover:text-yellow hover:border-yellow block border-l-2 border-transparent pl-4 text-base leading-8 transition-colors"
                                onClick={onClose}
                              >
                                {subcategory.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </>
                  ) : (
                    // Simple link for categories without subcategories
                    <Link
                      href={category.href}
                      className="text-dark hover:bg-light flex items-center justify-between px-6 py-3 text-lg leading-7 font-semibold transition-colors"
                      onClick={onClose}
                    >
                      <div className="flex items-center gap-4">
                        {/* Icon placeholder */}
                        <div className="bg-light border-grey-light flex h-8 w-8 items-center justify-center rounded-lg border">
                          <div className="bg-yellow h-4 w-4 rounded-sm" />
                        </div>
                        <span>{category.name}</span>
                      </div>
                      <ChevronDownIcon className="text-yellow h-6 w-6 rotate-[-90deg]" />
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
