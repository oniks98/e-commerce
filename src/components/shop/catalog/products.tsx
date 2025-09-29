import ProductCard from '@/components/ui/product-card';
import { Tables } from '@/lib/supabase/types/database';

type Product = Tables<'products'>;

interface ProductsProps {
  products: Product[];
  locale: string;
}

const Products = ({ products, locale }: ProductsProps) => {
  return (
    <div className="grid max-w-240 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} locale={locale} />
      ))}
    </div>
  );
};

export default Products;
