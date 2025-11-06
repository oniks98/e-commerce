'use client';

import Logo from '@/components/shop/ui/logo';

import { PhoneIcon, HamburgerIcon, CloseIcon } from '@/lib/shop/icons';

interface MobileTopBarProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

const MobileTopBar = ({ onMenuClick, isMenuOpen }: MobileTopBarProps) => {
  return (
    <div className="flex h-[70px] items-center justify-between">
      <button onClick={onMenuClick} aria-label="Toggle menu" className="p-2">
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
  );
};

export default MobileTopBar;
