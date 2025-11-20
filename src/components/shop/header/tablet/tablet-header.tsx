'use client';

import TabletMainHeader from '@/components/shop/header/tablet/tablet-main-header';
import TabletTopBar from '@/components/shop/header/tablet/tablet-top-bar';

import { CategoryTreeItem } from '@/lib/shop/actions/category';

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
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative bg-white">
      <div className="relative z-50 mx-auto max-w-[1360px] bg-white px-[35px]">
        <TabletTopBar
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={toggleMobileMenu}
        />
      </div>
      <div className="border-light border-b-2"></div>
      <div className="relative z-50 mx-auto max-w-[1360px] bg-white px-[35px]">
        <TabletMainHeader locale={locale} catalogData={catalogData} />
      </div>
    </div>
  );
};

export default TabletHeader;
