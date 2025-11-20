'use client';

import MobileMainHeader from '@/components/shop/header/mobile/mobile-main-header';
import MobileTopBar from '@/components/shop/header/mobile/mobile-top-bar';

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
  return (
    <div className="relative bg-white">
      <div className="relative z-50 mx-auto bg-white px-4">
        <MobileTopBar onMenuClick={onMenuClick} isMenuOpen={isMenuOpen} />
      </div>
      <div className="border-light border-b-2"></div>
      <div className="relative z-50 mx-auto bg-white px-4">
        <MobileMainHeader locale={locale} catalogData={catalogData} />
      </div>
    </div>
  );
};

export default MobileHeader;
