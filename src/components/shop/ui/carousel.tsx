// src/components/shop/ui/carousel.tsx
import React from 'react';
import clsx from 'clsx';

export default function Carousel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('relative', className)}>
      <div className="flex space-x-4 overflow-x-auto p-4">{children}</div>
    </div>
  );
}
