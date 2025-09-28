import Footer from '@/components/shop/footer/footer';
import Header from '@/components/shop/header/header';
import { getAllCategories } from '@/lib/shop/actions/category';

export default async function PublicLayout({
  children,
  params,
  modal,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
  modal: React.ReactNode;
}) {
  const { locale } = await params;
  const catalogData = await getAllCategories();

  return (
    <>
      <Header locale={locale} catalogData={catalogData} />
      <main>{children}</main>
      {modal}
      <Footer locale={locale} catalogData={catalogData} />
    </>
  );
}
