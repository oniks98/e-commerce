'use client';

import { useState } from 'react';

import MobileCatalogMenu from '@/components/shop/header/mobile/mobile-catalog-menu';
import ActionButtons from '@/components/shop/header/shared/action-buttons';
import CatalogButton from '@/components/shop/header/shared/catalog-button';
import PhoneMenu from '@/components/shop/header/shared/phone-menu';
import SearchInput from '@/components/shop/header/shared/search-input';

import { CategoryTreeItem } from '@/lib/shop/actions/category';

interface TabletMainHeaderProps {
  locale: string;
  catalogData: CategoryTreeItem[];
}

const TabletMainHeader = ({ locale, catalogData }: TabletMainHeaderProps) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const handleCatalogToggle = () => {
    setIsCatalogOpen(!isCatalogOpen);
  };

  const handleCatalogClose = () => {
    setIsCatalogOpen(false);
  };

  return (
    <>
      <div className="flex h-[80px] items-center gap-3">
        <div className="flex flex-1 items-center gap-3">
          <CatalogButton className="shrink-0" onClick={handleCatalogToggle} />
          <SearchInput className="flex-1" />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <PhoneMenu />
          <ActionButtons />
        </div>
      </div>

      <MobileCatalogMenu
        isOpen={isCatalogOpen}
        onClose={handleCatalogClose}
        locale={locale}
        catalogData={catalogData}
      />
    </>
  );
};

export default TabletMainHeader;
