import React from 'react';
import { ReloadIcon } from '@/lib/shop/icons';

interface BtnLoadMoreProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const BtnLoadMore = ({ children, icon, ...props }: BtnLoadMoreProps) => {
  return (
    <button
      className="flex items-center rounded-lg bg-yellow-500 px-5 py-3 text-lg font-semibold text-white disabled:opacity-50"
      {...props}
    >
      {icon || <ReloadIcon className="mr-2 h-6 w-6" />}
      {children}
    </button>
  );
};

export default BtnLoadMore;
