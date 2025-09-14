import Link from 'next/link';
// import Logo from '@/lib/shop/icons/logo';
import CatalogIcon from '@/lib/shop/icons/CatalogIcon';
import SearchIcon from '@/lib/shop/icons/SearchIcon';
import FavoritesIcon from '@/lib/shop/icons/FavoritesIcon';
import CartIcon from '@/lib/shop/icons/CartIcon';
import { PhoneMenu } from '@/components/shop/ui/phone-menu';
import Image from 'next/image';
import clsx from 'clsx';

const MainHeader = () => {
  return (
    <div className="border-light border-b-2 bg-white">
      <div
        className={clsx(
          'mx-auto flex h-[100px] max-w-[1360px] items-center justify-between px-[35px]',
        )}
      >
        <Link href="/" aria-label="Home">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={250}
            height={50}
            priority
          />
          {/* <Logo className="h-[50px] w-[250px]" /> */}
        </Link>

        <div className="flex items-center gap-[30px]">
          <button
            className={clsx(
              'bg-yellow flex h-[50px] items-center gap-[10px] rounded-lg px-5 py-3',
              'hover:bg-yellow-dark font-semibold text-white',
            )}
          >
            <CatalogIcon className="h-6 w-6" />
            <span>Каталог</span>
          </button>

          <div className="relative">
            <input
              type="search"
              placeholder="Пошук товарів"
              className={clsx(
                'border-grey-light h-[50px] w-[421px] rounded-lg border pr-12 pl-4',
                'placeholder:text-grey-light text-base',
              )}
            />
            <SearchIcon className="text-grey absolute top-1/2 right-4 h-6 w-6 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex items-center gap-[20px]">
          <PhoneMenu />
          <button aria-label="Favorites" className="p-2">
            <div className="relative h-[50px] w-[50px]">
              <div className="border-yellow absolute inset-0 rounded-full border-2"></div>
              <FavoritesIcon className="text-grey hover:text-yellow absolute top-1/2 left-1/2 h-[23px] w-[26px] -translate-x-1/2 -translate-y-1/2" />
            </div>
          </button>
          <button aria-label="Cart" className="p-2">
            <div className="relative h-[50px] w-[50px]">
              <div className="border-yellow absolute inset-0 rounded-full border-2"></div>
              <CartIcon className="text-grey hover:text-yellow absolute top-1/2 left-1/2 h-[25px] w-[25px] -translate-x-1/2 -translate-y-1/2" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
