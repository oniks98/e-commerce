// src\app\(admin)\[locale]\(private)\layout.tsx
import React from 'react';
import Sidebar from '@/components/admin/sidebar';
import Header from '@/components/shop/header/header';

export default function AdminPrivateLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <div className="ml-60">{children}</div>
      </main>
      {modal}
    </>
  );
}
