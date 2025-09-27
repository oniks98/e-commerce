import Footer from '@/components/shop/footer/footer';
import Header from '@/components/shop/header/header';
import { getAllCategories } from '@/lib/shop/actions/category';

export default async function PublicLayout({
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
      <Header locale={locale} catalogData={catalogData} />
      <main>{children}</main>
      <Footer locale={locale} catalogData={catalogData} />
    </>
  );
}
