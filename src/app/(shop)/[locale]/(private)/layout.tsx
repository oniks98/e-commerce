import React from 'react';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return <div>{children}</div>;
}
