'use client';

import Link from 'next/link';

import clsx from 'clsx';

import { RightArrowIcon } from '@/lib/shop/icons';

type BreadcrumbItem = {
  label: string;
  href: string;
  active?: boolean;
};

type ClientBreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function ClientBreadcrumbs({
  items,
  className,
}: ClientBreadcrumbsProps) {
  return (
    <nav
      className={clsx(
        'text-grey flex flex-wrap items-center gap-y-2 py-1 text-base font-normal',
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.href} className="flex items-center">
            {index > 0 && (
              <span className="mx-2">
                <RightArrowIcon />
              </span>
            )}
            {isLast ? (
              <span className="text-sky font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-grey hover:text-sky-dark transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
