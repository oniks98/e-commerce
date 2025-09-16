import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import RegistrationIcon from '@/lib/shop/icons/RegistrationIcon';
import { LanguageSwitcher } from '@/components/shop/header/shared/language-switcher';
import Navigation from '../shared/Navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[70px] left-0 z-50 w-full max-w-[480px] bg-white shadow-lg">
      <div className="px-[35px] py-[35px]">
        <div className="flex flex-col gap-[40px]">
          {/* Theme and Registration controls - visible only on mobile (< 768px) */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 md:hidden">
            <div className="hover:text-yellow flex items-center gap-4 transition-colors">
              <ThemeToggle className="text-grey h-6 w-6" />
              <span className="text-sm text-[#535353]">Тема</span>
            </div>
            <LanguageSwitcher />
            <button
              aria-label="Registration"
              className="hover:text-yellow flex items-center gap-2 p-2 transition-colors"
              onClick={onClose}
            >
              <RegistrationIcon className="text-grey h-6 w-6" />
              <span className="text-sm text-[#535353]">Вхід</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <Navigation
              className="flex-col items-start gap-4"
              isMobile={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
