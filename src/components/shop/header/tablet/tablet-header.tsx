'use client';

import { useState } from 'react';

import clsx from 'clsx';

import ActionButtons from '@/components/shop/header/shared/action-buttons';
import CatalogButton from '@/components/shop/header/shared/catalog-button';
import LanguageSwitcher from '@/components/shop/header/shared/language-switcher';
import PhoneMenu from '@/components/shop/header/shared/phone-menu';
import SearchInput from '@/components/shop/header/shared/search-input';
import Logo from '@/components/shop/ui/logo';
import ThemeToggle from '@/components/shop/ui/theme-toggle';

import { CategoryTreeItem } from '@/lib/shop/actions/category';
import { RegistrationIcon, HamburgerIcon, CloseIcon } from '@/lib/shop/icons';

import MobileCatalogMenu from '../mobile/mobile-catalog-menu';

interface TabletHeaderProps {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  locale: string;
  catalogData: CategoryTreeItem[];
}

const TabletHeader = ({
  isMobileMenuOpen,
  setMobileMenuOpen,
  locale,
  catalogData,
}: TabletHeaderProps) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCatalogToggle = () => {
    setIsCatalogOpen(!isCatalogOpen);
  };

  const handleCatalogClose = () => {
    setIsCatalogOpen(false);
  };

  return (
    <div className="border-light relative border-b-2 bg-white">
      {/* Header content stays visible */}
      <div className="relative z-50 mx-auto max-w-[1360px] bg-white px-[35px]">
        {/* Верхняя строка - TopBar адаптированный */}
        <div className="bg-white py-2">
          <div className="text-grey flex items-center justify-between">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="text-grey h-6 w-6" />
              ) : (
                <HamburgerIcon className="text-grey h-[25px] w-[38px]" />
              )}
            </button>

            <div className="text-dark flex w-[250px] flex-row items-center">
              <div className="h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full bg-white">
                <Logo />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  💎 ONYX - для Вас безпека та комфорт
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-[10px]">
              <LanguageSwitcher />
              <ThemeToggle />
              <button
                aria-label="Registration"
                className="hover:text-yellow p-2"
              >
                <RegistrationIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Главная строка */}
        <div className="flex h-[80px] items-center gap-3">
          {/* Каталог + Поиск */}
          <div className="flex flex-1 items-center gap-3">
            <CatalogButton className="shrink-0" onClick={handleCatalogToggle} />
            <SearchInput className="flex-1" />
          </div>

          {/* Иконки справа */}
          <div className="flex shrink-0 items-center gap-2">
            <PhoneMenu />
            <ActionButtons />
          </div>
        </div>
      </div>

      {/* Tablet Catalog Menu (uses mobile version) */}
      <MobileCatalogMenu
        isOpen={isCatalogOpen}
        onClose={handleCatalogClose}
        locale={locale}
        catalogData={catalogData}
      />
    </div>
  );
};

export default TabletHeader;
