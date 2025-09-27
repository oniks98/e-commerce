// src\app\(shop)\[locale]\(private)\layout.tsx
import Footer from '@/components/shop/footer/footer';
import { getAllCategories } from '@/lib/shop/actions/category';

export default async function PrivateLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const catalogData = await getAllCategories();

  return (
    <>
      <main className="pt-[138px]">{children}</main>
      <Footer locale={locale} catalogData={catalogData} />
    </>
  );
}
