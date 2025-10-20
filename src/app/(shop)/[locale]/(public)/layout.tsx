import Footer from '@/components/shop/footer/footer';
import Header from '@/components/shop/header/header';
import Advantages from '@/components/shop/ui/advantages';

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
      <div className="bg-light flex min-h-screen flex-col">
        <Header locale={locale} catalogData={catalogData} />
        <main className="flex-grow">{children}</main>
        <div className="bg-white">
          <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
            <Advantages />
          </div>
        </div>
        <Footer locale={locale} catalogData={catalogData} />
      </div>
      {modal}
    </>
  );
}
