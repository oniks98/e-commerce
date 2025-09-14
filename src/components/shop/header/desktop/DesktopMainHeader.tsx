import Logo from '../shared/Logo';
import CatalogButton from '../shared/CatalogButton';
import SearchInput from '../shared/SearchInput';
import ActionButtons from '../shared/ActionButtons';
import { PhoneMenu } from '@/components/shop/header/shared/phone-menu';
import clsx from 'clsx';

const DesktopMainHeader = () => {
  return (
    <div className="border-light border-b-2 bg-white">
      <div
        className={clsx(
          'mx-auto flex h-[100px] max-w-[1360px] items-center gap-[30px] px-[35px]',
        )}
      >
        {/* Лого */}
        <Logo />

        {/* Каталог + Поиск */}
        <div className="flex flex-1 items-center gap-[30px]">
          <CatalogButton className="shrink-0" />
          <SearchInput className="flex-1" />
        </div>

        {/* Иконки справа */}
        <div className="flex shrink-0 items-center gap-[20px]">
          <PhoneMenu />
          <ActionButtons />
        </div>
      </div>
    </div>
  );
};

export default DesktopMainHeader;
