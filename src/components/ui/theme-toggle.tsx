import * as React from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

import { MoonIcon, ThemeIcon } from '@/lib/shop/icons';

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={clsx('h-6 w-6', className)} />;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="hover:text-yellow p-2"
    >
      {resolvedTheme === 'dark' ? (
        <ThemeIcon className={clsx('h-6 w-6', className)} />
      ) : (
        <MoonIcon className={clsx('h-6 w-6', className)} />
      )}
    </button>
  );
}
