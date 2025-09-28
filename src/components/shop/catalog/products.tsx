import ProductCard, { Product } from './product-card';

const placeholderProducts: Product[] = [
  {
    id: '1',
    name: 'Ліжко Спарта / Sparta з підйомним механізмом',
    sku: 'sparta-bed',
    price: 15400,
    old_price: 25400,
    image: '/images/single-beds.png',
    in_stock: true,
    size: '61 x 184 x 2130 мм',
  },
  {
    id: '2',
    name: 'Ліжко Аргон з підйомним механізмом',
    sku: 'argon-bed',
    price: 16400,
    image: '/images/double-beds.png',
    in_stock: true,
    size: '61 x 184 x 2130 мм',
  },
  {
    id: '3',
    name: 'Ліжко Престиж з підйомним механізмом',
    sku: 'prestige-bed',
    price: 14969,
    image: '/images/sofa-beds.png',
    in_stock: true,
    size: '61 x 184 x 2130 мм',
  },
  {
    id: '4',
    name: 'Диван Токіо-2',
    sku: 'tokio-2-sofa',
    price: 13211,
    image: '/images/wooden-beds.png',
    in_stock: true,
    size: '61 x 184 x 2130 мм',
  },
  {
    id: '5',
    name: 'Матрац Largo SLIM / Ларго Слім',
    sku: 'largo-slim-mattress',
    price: 2810,
    old_price: 3122,
    image: '/images/metal-beds.png',
    in_stock: true,
    size: '61 x 184 x 2130 мм',
  },
  {
    id: '6',
    name: 'Матрац ARGENTUM AMALTEA / Аргентум Амалті',
    sku: 'argentum-amaltea-mattress',
    price: 5071,
    old_price: 5966,
    image: '/images/soft-beds.png',
    in_stock: true,
    size: '61 x 184 x 2130 мм',
  },
  {
    id: '7',
    name: 'Диван Браво',
    sku: 'bravo-sofa',
    price: 10008,
    image: '/images/podium-beds.png',
    in_stock: true,
    size: '61 x 184 x 2130 мм',
  },
  {
    id: '8',
    name: 'Ліжко МК-5',
    sku: 'mk-5-bed',
    price: 8775,
    image: '/images/children-beds.png',
    in_stock: true,
    size: '61 x 184 x 2130 мм',
  },
];

const Products = () => {
  return (
    <div className="grid max-w-240 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {placeholderProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
