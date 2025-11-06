'use client';

import LanguageSwitcher from '@/components/shop/header/shared/language-switcher';
import Logo from '@/components/shop/ui/logo';
import ThemeToggle from '@/components/shop/ui/theme-toggle';

import { RegistrationIcon, HamburgerIcon, CloseIcon } from '@/lib/shop/icons';

interface TabletTopBarProps {
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

const TabletTopBar = ({
  isMobileMenuOpen,
  onToggleMobileMenu,
}: TabletTopBarProps) => {
  return (
    <div className="bg-white py-2">
      <div className="text-grey flex items-center justify-between">
        <button
          onClick={onToggleMobileMenu}
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
               ONYX - для Вас безпека та комфорт
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-[10px]">
          <LanguageSwitcher />
          <ThemeToggle />
          <button aria-label="Registration" className="hover:text-sky p-2">
            <RegistrationIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabletTopBar;
