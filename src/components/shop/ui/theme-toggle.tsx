'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { MoonIcon, ThemeIcon } from '@/lib/shop/icons';

const ThemeToggle = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
    setIsDark(next === 'dark');
  };

  if (!mounted) return <div className={clsx('h-6 w-6', className)} />;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="hover:text-yellow dark:hover:text-yellow p-2 transition-colors duration-200"
    >
      {isDark ? (
        <ThemeIcon
          className={clsx(
            'h-6 w-6 transition-transform duration-200',
            className,
          )}
        />
      ) : (
        <MoonIcon
          className={clsx(
            'h-6 w-6 transition-transform duration-200',
            className,
          )}
        />
      )}
    </button>
  );
};

export default ThemeToggle;
