// src\app\(admin)\[locale]\(private)\layout.tsx
import React from 'react';

import Sidebar from '@/components/admin/sidebar';

export default function AdminLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <main>
        <Sidebar />
        <div className="ml-60">{children}</div>
      </main>
      {modal}
    </>
  );
}
