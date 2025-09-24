'use client';

import { useState } from 'react';
import DesktopHeader from '@/components/shop/header/desktop/desktop-header';
import TabletHeader from '@/components/shop/header/tablet/tablet-header';
import MobileHeader from '@/components/shop/header/mobile/mobile-header';
import MobileMenu from '@/components/shop/header/mobile/mobile-menu';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative z-50">
      {/* Desktop 1180px+ */}
      <div className="fixed top-0 left-0 hidden w-full xl:block">
        <DesktopHeader />
      </div>

      {/* Tablet 768-1179px */}
      <div className="hidden md:block xl:hidden">
        <TabletHeader
          isMobileMenuOpen={isMobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        {/* Mobile Menu for tablet */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Mobile 0-767px */}
      <div className="block md:hidden">
        <MobileHeader
          onMenuClick={toggleMobileMenu}
          isMenuOpen={isMobileMenuOpen}
        />
        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
