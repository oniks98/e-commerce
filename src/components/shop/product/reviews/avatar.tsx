import clsx from 'clsx';
import { AccountIcon } from '@/lib/shop/icons';
import Logo from '@/components/shop/ui/logo';

interface AvatarProps {
  isCompany?: boolean;
  size?: 'sm' | 'md';
}

const Avatar = ({ isCompany, size = 'md' }: AvatarProps) => {
  const containerStyles = clsx(
    'relative shrink-0 rounded-full',
    size === 'md' && 'h-[50px] w-[50px]',
    size === 'sm' && 'h-[40px] w-[40px] md:h-[50px] md:w-[50px]',
  );

  const iconStyles = clsx(
    size === 'md' && 'h-[21.43px] w-[21.43px]',
    size === 'sm' && 'h-[18px] w-[18px] md:h-[21.43px] md:w-[21.43px]',
  );

  return (
    <div className={containerStyles}>
      <div className="border-yellow absolute inset-0 rounded-full border bg-white" />
      {isCompany ? (
        <div className="absolute overflow-hidden rounded-full">
          <Logo />
        </div>
      ) : (
        <div className="text-grey absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <AccountIcon className={iconStyles} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
