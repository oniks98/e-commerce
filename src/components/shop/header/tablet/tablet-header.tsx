'use client';

import { useState } from 'react';
import Logo from '../shared/logo';
import CatalogButton from '../shared/catalog-button';
import SearchInput from '../shared/search-input';
import ActionButtons from '../shared/action-buttons';
import { LanguageSwitcher } from '@/components/shop/header/shared/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import RegistrationIcon from '@/lib/shop/icons/registration-icon';
import HamburgerIcon from '@/lib/shop/icons/hamburger-icon';
import CloseIcon from '@/lib/shop/icons/close-icon';
import { PhoneMenu } from '@/components/shop/header/shared/phone-menu';
import MobileCatalogMenu from '../mobile/mobile-catalog-menu';
import clsx from 'clsx';

interface TabletHeaderProps {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const TabletHeader = ({
  isMobileMenuOpen,
  setMobileMenuOpen,
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

            <Logo />

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
        <div className="flex h-[72px] items-center gap-3 pb-4">
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
      <MobileCatalogMenu isOpen={isCatalogOpen} onClose={handleCatalogClose} />
    </div>
  );
};

export default TabletHeader;
