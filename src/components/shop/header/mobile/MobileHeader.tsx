import Logo from '../shared/Logo';
import CatalogButton from '../shared/CatalogButton';
import SearchInput from '../shared/SearchInput';
import ActionButtons from '../shared/ActionButtons';
import PhoneIcon from '@/lib/shop/icons/PhoneIcon';
import HamburgerIcon from '@/lib/shop/icons/HamburgerIcon';
import CloseIcon from '@/lib/shop/icons/CloseIcon';

interface MobileHeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

const MobileHeader = ({ onMenuClick, isMenuOpen }: MobileHeaderProps) => {
  return (
    <div className="border-light border-b-2 bg-white px-4 shadow-md">
      <div className="mx-auto">
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
          <CatalogButton size="compact" />

          {/* Иконки справа */}
          <div className="flex items-center gap-2">
            <SearchInput variant="mobile" />
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
