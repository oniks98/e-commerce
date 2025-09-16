'use client';

import { useState } from 'react';
import Logo from '../shared/logo';
import CatalogButton from '../shared/catalog-button';
import SearchInput from '../shared/search-input';
import ActionButtons from '../shared/action-buttons';
import PhoneIcon from '@/lib/shop/icons/phone-icon';
import HamburgerIcon from '@/lib/shop/icons/hamburger-icon';
import CloseIcon from '@/lib/shop/icons/close-icon';
import MobileCatalogMenu from './mobile-catalog-menu';

interface MobileHeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

const MobileHeader = ({ onMenuClick, isMenuOpen }: MobileHeaderProps) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const handleCatalogToggle = () => {
    setIsCatalogOpen(!isCatalogOpen);
  };

  const handleCatalogClose = () => {
    setIsCatalogOpen(false);
  };

  return (
    <div className="border-light relative border-b-2 bg-white shadow-md">
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

          <Logo width={215} height={43} />

          <div className="flex items-center">
            <button aria-label="Call us" className="p-2">
              <div className="h-[50px] w-[50px]">
                <PhoneIcon className="text-grey h-6 w-6" />
              </div>
            </button>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="flex items-center justify-between gap-3 py-3">
          <CatalogButton size="compact" onClick={handleCatalogToggle} />

          {/* Иконки справа */}
          <div className="flex items-center gap-2">
            <SearchInput variant="mobile" />
            <ActionButtons />
          </div>
        </div>
      </div>

      {/* Mobile Catalog Menu */}
      <MobileCatalogMenu isOpen={isCatalogOpen} onClose={handleCatalogClose} />
    </div>
  );
};

export default MobileHeader;
