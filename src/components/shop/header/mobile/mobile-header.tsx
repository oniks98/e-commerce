'use client';

import { useState } from 'react';
import clsx from 'clsx';

import Logo from '@/components/shop/ui/logo';
import CatalogButton from '@/components/shop/header/shared/catalog-button';
import SearchInput from '@/components/shop/header/shared/search-input';
import ActionButtons from '@/components/shop/header/shared/action-buttons';
import {
  PhoneIcon,
  HamburgerIcon,
  CloseIcon,
  SearchIcon,
} from '@/lib/shop/icons';
import MobileCatalogMenu from '@/components/shop/header/mobile/mobile-catalog-menu';

import { CategoryTreeItem } from '@/lib/shop/actions/category';

interface MobileHeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
  locale: string;
  catalogData: CategoryTreeItem[];
}

const MobileHeader = ({
  onMenuClick,
  isMenuOpen,
  locale,
  catalogData,
}: MobileHeaderProps) => {
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
    <div className="border-light relative border-b-2 bg-white">
      {/* Header content stays visible */}
      <div className="relative z-50 mx-auto bg-white px-4">
        {/* Верхняя строка */}
        <div className="flex h-[70px] items-center justify-between">
          <button
            onClick={onMenuClick}
            aria-label="Toggle menu"
            className="p-2"
          >
            {isMenuOpen ? (
              <CloseIcon className="text-grey h-6 w-6" />
            ) : (
              <HamburgerIcon className="text-grey h-[25px] w-[38px]" />
            )}
          </button>

          <div className="flex w-[240px] flex-row items-center">
            <div className="h-[50px] w-[50px] shrink-0 overflow-hidden rounded-full bg-white">
              <Logo />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-semibold">
                💎 ONYX - для Вас безпека та комфорт
              </h3>
            </div>
          </div>

          <div className="flex items-center">
            <a href="tel:+380633388260" aria-label="Call us" className="p-2">
              <div className="bg-light relative h-[50px] w-[50px] rounded-full">
                <PhoneIcon className="text-grey absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </a>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="flex items-center justify-between gap-3 py-3">
          <CatalogButton size="compact" onClick={handleCatalogToggle} />

          {/* Иконки справа */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSearchToggle}
              className="relative h-[50px] w-[50px]"
            >
              {isSearchOpen ? (
                <>
                  <div className="border-yellow h-full w-full rounded-full border-2" />
                  <CloseIcon className="text-grey absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
                </>
              ) : (
                <>
                  <div className="border-yellow h-full w-full rounded-full border-2" />
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
      </div>

      {isSearchOpen && (
        <div className="absolute top-full left-0 z-50 w-full bg-white p-4 shadow-lg">
          <SearchInput variant="desktop" />
        </div>
      )}

      {/* Mobile Catalog Menu */}
      <MobileCatalogMenu
        isOpen={isCatalogOpen}
        onClose={handleCatalogClose}
        locale={locale}
        catalogData={catalogData}
      />
    </div>
  );
};

export default MobileHeader;
