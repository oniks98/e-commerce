// src\app\(shop)\[locale]\(private)\layout.tsx
import React from 'react';

import Header from '@/components/shop/header/header';
import Footer from '@/components/shop/footer/footer';

export default function ShopPrivateLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>;
      <Footer />
    </>
  );
}
