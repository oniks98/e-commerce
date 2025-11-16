import { useState, useRef, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import AuthModal from '@/components/shop/modals/auth-modal';

import { AccountIcon } from '@/lib/shop/icons';
import {
  getInitials,
  getAvatarColor,
  getUserName,
} from '@/lib/shop/utils/avatar';
import { createClient } from '@/lib/supabase/client';

import { useAuthStore } from '@/store/auth-store';

export default function AuthButton() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const userName = getUserName(user);
  const userEmail = user?.email || '';
  const avatarUrl = user?.user_metadata?.avatar_url;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowUserMenu(false);
    router.refresh();
  };

  const handleAuthClick = () => {
    if (user) {
      setShowUserMenu(!showUserMenu);
      setShowTooltip(false);
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={handleAuthClick}
          onMouseEnter={() => !showUserMenu && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={user ? 'Меню користувача' : 'Увійти'}
          className="relative p-2 transition-opacity duration-200 hover:opacity-80"
        >
          {user ? (
            avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={userName}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white ${getAvatarColor(userName)}`}
              >
                {getInitials(userName)}
              </div>
            )
          ) : (
            <AccountIcon className="h-6 w-6" />
          )}
        </button>

        {showTooltip && !user && (
          <div className="bg-dark absolute top-full right-0 mt-2 rounded-lg px-3 py-1.5 text-sm whitespace-nowrap text-white shadow-lg">
            Увійти
          </div>
        )}

        {showUserMenu && user && (
          <div className="border-grey-light-r absolute top-full right-0 z-50 mt-2 w-64 rounded-lg border bg-white shadow-xl">
            <div className="border-grey-light-r border-b px-4 py-3">
              <p className="text-dark truncate font-medium">{userName}</p>
              <p className="text-grey truncate text-sm">{userEmail}</p>
            </div>

            <div className="py-2">
              <Link
                href="/cabinet"
                className="text-grey hover:bg-grey-light-r hover:text-dark block px-4 py-2 text-sm transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                Кабінет
              </Link>
              <Link
                href="/orders"
                className="text-grey hover:bg-grey-light-r hover:text-dark block px-4 py-2 text-sm transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                Замовлення
              </Link>
              <Link
                href="/favorites"
                className="text-grey hover:bg-grey-light-r hover:text-dark block px-4 py-2 text-sm transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                Фаворітні товари
              </Link>
            </div>

            <div className="border-grey-light-r border-t py-2">
              <button
                onClick={handleLogout}
                className="text-red hover:bg-red/10 block w-full px-4 py-2 text-left text-sm transition-colors"
              >
                Вийти
              </button>
            </div>
          </div>
        )}
      </div>

      {showAuthModal && !user && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
}
