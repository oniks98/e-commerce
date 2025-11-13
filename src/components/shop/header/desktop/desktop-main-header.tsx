'use client';

import { useState, useEffect, useRef } from 'react';

import clsx from 'clsx';

import DesktopCatalogMenu from '@/components/shop/header/desktop/desktop-catalog-menu';
import ActionButtons from '@/components/shop/header/shared/action-buttons';
import CatalogButton from '@/components/shop/header/shared/catalog-button';
import PhoneMenu from '@/components/shop/header/shared/phone-menu';
import SearchInput from '@/components/shop/header/shared/search-input';
import Image from 'next/image';
import Link from 'next/link';

import { CategoryTreeItem } from '@/lib/shop/actions/category';

interface DesktopMainHeaderProps {
  locale: string;
  catalogData: CategoryTreeItem[];
}

const DesktopMainHeader = ({
  locale,
  catalogData,
}: DesktopMainHeaderProps) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleCatalogToggle = () => {
    setIsCatalogOpen(!isCatalogOpen);
  };

  const handleCatalogOpen = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsCatalogOpen(true);
  };

  const handleCatalogClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsCatalogOpen(false);
  };

  const handleCatalogDelayedClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsCatalogOpen(false);
    }, 150);
  };

  const checkMousePosition = (menuElement: HTMLElement | null) => {
    return (e: MouseEvent) => {
      if (!buttonRef.current) return;

      const buttonRect = buttonRef.current.getBoundingClientRect();

      const isOverButton =
        e.clientX >= buttonRect.left &&
        e.clientX <= buttonRect.right &&
        e.clientY >= buttonRect.top &&
        e.clientY <= buttonRect.bottom;

      let isOverMenu = false;
      if (menuElement) {
        const menuRect = menuElement.getBoundingClientRect();
        isOverMenu =
          e.clientX >= menuRect.left &&
          e.clientX <= menuRect.right &&
          e.clientY >= menuRect.top &&
          e.clientY <= menuRect.bottom;
      }

      if (!isOverButton && !isOverMenu) {
        handleCatalogDelayedClose();
      } else {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      }
    };
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCatalogOpen(false);
      }
    };

    if (isCatalogOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isCatalogOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="border-light relative z-50 border-b-2 bg-white">
      <div className="relative z-50 mx-auto max-w-[1360px] bg-white px-[35px]">
        <div className="flex h-[80px] items-center gap-[30px]">
          <Link
            href="/"
            className="group flex w-[260px] flex-col items-center xl:flex-row"
            aria-label="Повернутися на головну сторінку"
          >
            <div className="h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full bg-white">
              <Image
                src="/images/logo.png"
                alt="ONYX Logo"
                width={60}
                height={60}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-center xl:pl-3 xl:text-left">
              <h3 className="text-lg font-semibold transition-colors xl:text-left group-hover:text-sky-dark">
                ONYX - для Вас безпека та комфорт
              </h3>
            </div>
          </Link>

          <div className="flex flex-1 items-center gap-[30px]">
            <div ref={buttonRef} onMouseEnter={handleCatalogOpen}>
              <CatalogButton
                className={clsx('shrink-0', isCatalogOpen && 'bg-sky-dark')}
                onClick={handleCatalogToggle}
              />
            </div>
            <SearchInput className="flex-1" />
          </div>

          <div className="flex shrink-0 items-center gap-[20px]">
            <PhoneMenu />
            <ActionButtons />
          </div>
        </div>
      </div>

      <DesktopCatalogMenu
        isOpen={isCatalogOpen}
        onClose={handleCatalogClose}
        locale={locale}
        catalogData={catalogData}
        onMousePositionCheck={checkMousePosition}
      />
    </div>
  );
};

export default DesktopMainHeader;
