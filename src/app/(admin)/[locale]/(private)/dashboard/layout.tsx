// src\app\(admin)\[locale]\(private)\dashboard\layout.tsx

import React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
  analytics: React.ReactNode;
  reviews: React.ReactNode;
  settings: React.ReactNode;
}

export default function DashboardLayout({
  children,
  analytics,
  reviews,
  settings,
}: LayoutProps) {
  return (
    <div>
      {children}
      <div>{analytics}</div>
      <div>{reviews}</div>
      <div>{settings}</div>
    </div>
  );
}
