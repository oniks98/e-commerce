import ProductCard from '@/components/ui/product-card';
import { Tables } from '@/lib/supabase/types/database';

type Product = Tables<'products'>;

interface ProductsProps {
  products: Product[];
  locale: string;
}

const Products = ({ products, locale }: ProductsProps) => {
  return (
    <div className="grid [grid-template-columns:repeat(auto-fill,301px)] justify-center gap-7">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} locale={locale} />
      ))}
    </div>
  );
};

export default Products;
