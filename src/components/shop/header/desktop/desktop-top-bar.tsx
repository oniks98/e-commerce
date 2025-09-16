'use client';

import { LanguageSwitcher } from '@/components/shop/header/shared/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import RegistrationIcon from '@/lib/shop/icons/registration-icon';
import Navigation from '../shared/navigation';
import SocialLinks from '../shared/social-links';
import clsx from 'clsx';

const DesktopTopBar = () => {
  return (
    <div className="bg-light relative z-60">
      <div
        className={clsx(
          'mx-auto flex max-w-[1360px] items-center justify-between px-[35px] py-4',
          'text-grey',
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
            <button aria-label="Registration" className="hover:text-yellow p-2">
              <RegistrationIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopTopBar;
