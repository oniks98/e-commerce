import { getCategoryBySlug } from '@/lib/shop/actions/category';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// This page will handle URLs like /en/catalog/smartphones

type CategoryPageProps = {
  params: Promise<{ locale: string; category: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category: categorySlug } = await params;

  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 md:px-[35px]">
      <h1 className="mb-4 text-3xl font-bold">{category.name}</h1>

      {category.children && category.children.length > 0 ? (
        <div>
          <h2 className="mb-2 text-2xl font-semibold">Підкатегорії</h2>
          <ul className="list-disc pl-5">
            {category.children.map(
              (subcategory: { id: string; name: string; slug: string }) => (
                <li key={subcategory.id} className="mb-1">
                  <Link
                    href={`/${locale}/catalog/${subcategory.slug}`}
                    className="text-lg text-blue-600 hover:underline"
                  >
                    {subcategory.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      ) : (
        <p className="text-lg">TODO: Відобразити товари для цієї категорії.</p>
      )}
    </div>
  );
}
