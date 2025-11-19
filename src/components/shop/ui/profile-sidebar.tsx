'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import clsx from 'clsx';

import { createClient } from '@/lib/supabase/client';

import { useAuthStore } from '@/store/auth-store';

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  {
    href: '/cabinet',
    label: 'Кабінет',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    href: '/orders',
    label: 'Замовлення',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
  },
  {
    href: '/favorites',
    label: 'Фаворітні товари',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
];

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser } = useAuthStore();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
    router.push('/');
  };

  return (
    <aside className="dark:bg-dark-card h-fit w-full rounded-lg bg-white shadow-sm transition-colors duration-200 md:w-64 md:px-[35px] xl:mt-[138px]">
      <nav className="p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'bg-sky text-white'
                      : 'text-grey hover:bg-grey-light-r dark:hover:bg-grey/20 hover:text-dark dark:hover:text-white',
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}

          <li className="border-grey-light-r dark:border-grey/20 border-t pt-2">
            <button
              onClick={handleLogout}
              className="text-red hover:bg-red/10 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Вийти</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
