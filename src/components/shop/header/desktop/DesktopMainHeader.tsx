'use client';

import { useState, useEffect } from 'react';
import Logo from '../shared/Logo';
import CatalogButton from '../shared/CatalogButton';
import SearchInput from '../shared/SearchInput';
import ActionButtons from '../shared/ActionButtons';
import { PhoneMenu } from '@/components/shop/header/shared/phone-menu';
import DesktopCatalogMenu from './DesktopCatalogMenu';
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
    <div className="border-light relative border-b-2 bg-white">
      {/* Header content stays visible - точно как в мобильной версии */}
      <div className="relative z-50 mx-auto max-w-[1360px] bg-white px-[35px]">
        <div className="flex h-[100px] items-center gap-[30px]">
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
