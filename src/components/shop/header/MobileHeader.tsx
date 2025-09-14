import Link from 'next/link';
import Logo from '@/lib/shop/icons/logo';
import CatalogIcon from '@/lib/shop/icons/CatalogIcon';
import SearchIcon from '@/lib/shop/icons/SearchIcon';
import FavoritesIcon from '@/lib/shop/icons/FavoritesIcon';
import CartIcon from '@/lib/shop/icons/CartIcon';
import PhoneIcon from '@/lib/shop/icons/PhoneIcon';
import HamburgerIcon from '@/lib/shop/icons/HamburgerIcon';
import { ThemeToggle } from '@/components/shop/ui/ThemeToggle';
import RegistrationIcon from '@/lib/shop/icons/RegistrationIcon';
import clsx from 'clsx';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader = ({ onMenuClick }: MobileHeaderProps) => {
  return (
    <div className="bg-white px-4 shadow-md">
      <div className="container mx-auto">
        {/* Top Row */}
        <div className="flex h-[90px] items-center justify-between">
          <button onClick={onMenuClick} aria-label="Open menu" className="p-2">
            <HamburgerIcon className="text-grey h-[25px] w-[38px]" />
          </button>
          <Link href="/" aria-label="KROVATO Home">
            <Logo className="h-[36px] w-[215px]" />
          </Link>
          <div className="flex items-center">
            <ThemeToggle className="text-grey h-8 w-8" />
            <button aria-label="Registration" className="p-2">
              <RegistrationIcon className="text-grey h-8 w-8" />
            </button>
            <button aria-label="Call us" className="p-2">
              <div className="relative h-[50px] w-[50px]">
                <div className="bg-light h-full w-full rounded-full" />
                <PhoneIcon className="text-grey absolute top-1/2 left-1/2 h-[23px] w-[23px] -translate-x-1/2 -translate-y-1/2" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Separator */}
        <div className="border-light border-t-2" />

        {/* Bottom Row */}
        <div className="flex h-[70px] items-center justify-between">
          <button
            className={clsx(
              'bg-yellow flex h-[50px] flex-grow items-center gap-[10px] rounded-lg px-4 py-3',
              'font-semibold text-white',
            )}
          >
            <CatalogIcon className="h-6 w-6" />
            <span>Каталог</span>
          </button>

          <div className="flex flex-grow justify-end gap-2">
            <button aria-label="Search" className="p-2">
              <div className="relative h-[50px] w-[50px]">
                <div className="border-yellow h-full w-full rounded-full border-2" />
                <SearchIcon className="text-grey absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </button>
            <button aria-label="Favorites" className="p-2">
              <div className="relative h-[50px] w-[50px]">
                <div className="border-yellow h-full w-full rounded-full border-2" />
                <FavoritesIcon className="text-grey absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </button>
            <button aria-label="Cart" className="p-2">
              <div className="relative h-[50px] w-[50px]">
                <div className="border-yellow h-full w-full rounded-full border-2" />
                <CartIcon className="text-grey absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
