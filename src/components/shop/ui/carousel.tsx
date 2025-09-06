// src/components/shop/ui/carousel.tsx
import React from 'react';
import { cn } from '@/lib/shop/utils/cn';

export default function Carousel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      {/* Basic carousel placeholder */}
      <div className="flex space-x-4 overflow-x-auto p-4">{children}</div>
    </div>
  );
}
