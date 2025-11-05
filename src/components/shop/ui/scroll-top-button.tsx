'use client';

import { useState, useEffect } from 'react';

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div className="fixed right-8 bottom-8 z-50">
      <button
        onClick={scrollToTop}
        className="bg-sky hover:bg-sky-dark rounded-full px-4 py-2 text-sm font-bold shadow-lg"
        aria-label="Scroll to top"
      >
        UP
      </button>
    </div>
  );
};

export default ScrollTopButton;
