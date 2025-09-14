'use client';

import { useState } from 'react';
import TopBar from './TopBar';
import MainHeader from './MainHeader';
// import NavBar from './NavBar';
import MobileHeader from './MobileHeader';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative z-50">
      {/* Desktop Header */}
      <div className="hidden xl:block">
        <TopBar />
        <MainHeader />
        {/* <NavBar /> */}
      </div>

      {/* Mobile Header */}
      <div className="block xl:hidden">
        <MobileHeader onMenuClick={toggleMobileMenu} />
      </div>

      {/* Mobile Menu - Conditionally rendered */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </header>
  );
};

export default Header;
