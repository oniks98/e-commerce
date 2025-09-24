'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/shop/header/shared/logo';
import CatalogButton from '@/components/shop/header/shared/catalog-button';
import SearchInput from '@/components/shop/header/shared/search-input';
import ActionButtons from '@/components/shop/header/shared/action-buttons';
import DesktopCatalogMenu from '@/components/shop/header/desktop/desktop-catalog-menu';
import { PhoneMenu } from '@/components/shop/header/shared/phone-menu';
import clsx from 'clsx';

const DesktopMainHeader = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const handleCatalogToggle = () => {
    setIsCatalogOpen(!isCatalogOpen);
  };

  const handleCatalogClose = () => {
    setIsCatalogOpen(false);
  };

  // Close catalog on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCatalogOpen(false);
      }
    };

    if (isCatalogOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isCatalogOpen]);

  return (
    <div className="border-light relative z-50 border-b-2 bg-white">
      {/* Header content stays visible - точно как в мобильной версии */}
      <div className="relative z-50 mx-auto max-w-[1360px] bg-white px-[35px]">
        <div className="flex h-[80px] items-center gap-[30px]">
          {/* Лого */}
          <Logo />

          {/* Каталог + Поиск */}
          <div className="flex flex-1 items-center gap-[30px]">
            <CatalogButton
              className={clsx('shrink-0', isCatalogOpen && 'bg-yellow-dark')}
              onClick={handleCatalogToggle}
            />
            <SearchInput className="flex-1" />
          </div>

          {/* Иконки справа */}
          <div className="flex shrink-0 items-center gap-[20px]">
            <PhoneMenu />
            <ActionButtons />
          </div>
        </div>
      </div>

      {/* Desktop Catalog Menu */}
      <DesktopCatalogMenu isOpen={isCatalogOpen} onClose={handleCatalogClose} />
    </div>
  );
};

export default DesktopMainHeader;
