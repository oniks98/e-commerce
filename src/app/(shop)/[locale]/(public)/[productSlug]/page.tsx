import { getProductBySku } from '@/lib/shop/actions/product';
import { notFound } from 'next/navigation';

// This page will handle URLs like /en/p123-iphone-15-pro

type ProductPageProps = {
  params: Promise<{ locale: string; productSlug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, productSlug } = await params;

  // Robustly parse the SKU and the slug from the URL parameter
  // Example: p123-iphone-15-pro -> sku: p123, slug: iphone-15-pro
  const match = productSlug.match(/^([^-]+)-(.*)$/);

  if (!match) {
    console.warn('Product slug format is incorrect. Could not parse SKU.');
    notFound();
  }

  const [, sku, slug] = match;

  const product = await getProductBySku(sku);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 md:px-[35px]">
      <h1 className="mb-4 text-3xl font-bold">
        {/* Name is a JSONB object, showing raw data for now */}
        Product Name: {JSON.stringify(product.name)}
      </h1>
      <p>SKU: {product.sku}</p>
      <p>Price (UAH): {product.price_uah}</p>
      <div className="mt-4">
        <h2 className="text-xl">Full Details:</h2>
        <pre className="mt-2 rounded bg-gray-100 p-4">
          {JSON.stringify(product, null, 2)}
        </pre>
      </div>
    </div>
  );
}
