import Footer from '@/components/shop/footer/footer';
import Header from '@/components/shop/header/header';
import AuthProvider from '@/components/shop/providers/auth-provider';
import ProfileSidebar from '@/components/shop/ui/profile-sidebar';

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
    <AuthProvider>
      <div className="bg-light flex min-h-screen flex-col">
        <Header locale={locale} catalogData={catalogData} />
        <main className="flex-grow">
          <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
            <div className="flex flex-col gap-6 md:flex-row">
              <ProfileSidebar className="hidden lg:block xl:mt-38" />
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </main>
        <Footer locale={locale} catalogData={catalogData} />
      </div>
    </AuthProvider>
  );
}
