'use client';

import { useState } from 'react';

import clsx from 'clsx';

import MobileCatalogMenu from '@/components/shop/header/mobile/mobile-catalog-menu';
import ActionButtons from '@/components/shop/header/shared/action-buttons';
import CatalogButton from '@/components/shop/header/shared/catalog-button';
import SearchInput from '@/components/shop/header/shared/search-input';

import { CategoryTreeItem } from '@/lib/shop/actions/category';
import { SearchIcon, CloseIcon } from '@/lib/shop/icons';

interface MobileMainHeaderProps {
  locale: string;
  catalogData: CategoryTreeItem[];
}

const MobileMainHeader = ({ locale, catalogData }: MobileMainHeaderProps) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleCatalogToggle = () => {
    setIsCatalogOpen(!isCatalogOpen);
  };

  const handleCatalogClose = () => {
    setIsCatalogOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-3 py-3">
        <CatalogButton size="compact" onClick={handleCatalogToggle} />

        <div className="flex items-center gap-2">
          <button
            onClick={handleSearchToggle}
            className="relative h-[50px] w-[50px]"
          >
            {isSearchOpen ? (
              <>
                <div className="border-sky h-full w-full rounded-full border-2" />
                <CloseIcon className="text-grey absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
              </>
            ) : (
              <>
                <div className="border-sky h-full w-full rounded-full border-2" />
                <SearchIcon
                  className={clsx(
                    'text-grey absolute top-1/2 left-1/2 h-6 w-6',
                    '-translate-x-1/2 -translate-y-1/2',
                  )}
                />
              </>
            )}
          </button>
          <ActionButtons />
        </div>
      </div>

      {isSearchOpen && (
        <div className="absolute top-full left-0 z-50 w-full bg-white p-4 shadow-lg">
          <SearchInput variant="desktop" />
        </div>
      )}

      <MobileCatalogMenu
        isOpen={isCatalogOpen}
        onClose={handleCatalogClose}
        locale={locale}
        catalogData={catalogData}
      />
    </>
  );
};

export default MobileMainHeader;
