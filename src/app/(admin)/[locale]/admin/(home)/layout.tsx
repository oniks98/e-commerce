// src/app/admin/[locale]/(private)/dashboard/layout.tsx
import React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
  analytics: React.ReactNode;
  reviews: React.ReactNode;
  settings: React.ReactNode;
}

export default function AdminHomeLayout({
  children,
  analytics,
  reviews,
  settings,
}: LayoutProps) {
  return (
    <div className="space-y-6">
      {/* Главный контент dashboard */}
      <div>{children}</div>

      {/* Параллельные секции */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>{analytics}</div>
        <div>{reviews}</div>
        <div>{settings}</div>
      </div>
    </div>
  );
}
