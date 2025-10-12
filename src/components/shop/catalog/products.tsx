import ProductCard from '@/components/shop/ui/product-card';
import { Tables } from '@/lib/supabase/types/database';

type Product = Tables<'products'>;

interface ProductsProps {
  products: Product[];
  locale: string;
}

const Products = ({ products, locale }: ProductsProps) => {
  return (
    <ul className="grid [grid-template-columns:repeat(auto-fill,301px)] justify-center gap-7">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} locale={locale} />
        </li>
      ))}
    </ul>
  );
};

export default Products;
