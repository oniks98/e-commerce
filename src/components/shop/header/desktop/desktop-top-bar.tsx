'use client';

import clsx from 'clsx';

import LanguageSwitcher from '@/components/shop/header/shared/language-switcher';
import Navigation from '@/components/shop/header/shared/navigation';
import AuthButton from '@/components/shop/modals/auth-button';
import SocialLinks from '@/components/shop/ui/social-links';
import ThemeToggle from '@/components/shop/ui/theme-toggle';

const DesktopTopBar = () => {
  return (
    <div className="bg-light relative z-60 transition-colors duration-200">
      <div
        className={clsx(
          'mx-auto flex max-w-[1360px] items-center justify-between px-[35px] py-2',
          'text-grey transition-colors duration-200',
        )}
      >
        <Navigation />

        <div className="flex items-center gap-[20px]">
          <div className="text-base leading-[30px] font-normal">
            Допомога і консультація:
          </div>

          <SocialLinks />

          <div className="flex items-center gap-[10px]">
            <LanguageSwitcher />
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopTopBar;
