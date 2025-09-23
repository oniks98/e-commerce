import { SearchIcon } from '@/lib/shop/icons';
import clsx from 'clsx';

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  variant?: 'desktop' | 'mobile';
}

const SearchInput = ({
  placeholder = 'Пошук товарів',
  className = '',
  variant = 'desktop',
}: SearchInputProps) => {
  if (variant === 'mobile') {
    return (
      <button aria-label="Search" className="relative">
        <div className="relative h-[50px] w-[50px]">
          <div className="border-yellow h-full w-full rounded-full border-2" />
          <SearchIcon className="text-grey absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </button>
    );
  }

  return (
    <div className={clsx('relative', className)}>
      <input
        type="search"
        placeholder={placeholder}
        className={clsx(
          'border-grey-light h-[50px] w-full rounded-lg border pr-12 pl-4',
          'placeholder:text-grey-light text-base',
        )}
      />
      <SearchIcon className="text-grey absolute top-1/2 right-4 h-6 w-6 -translate-y-1/2" />
    </div>
  );
};

export default SearchInput;
