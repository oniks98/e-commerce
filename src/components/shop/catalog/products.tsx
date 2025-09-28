import ProductCard from '@/components/ui/product-card';
import { products } from '@/lib/shop/constants/products-data';

const Products = () => {
  return (
    <div className="grid max-w-240 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
