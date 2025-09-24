import { CatalogCategory } from '@/lib/shop/constants/catalog-data';
import Link from 'next/link';

interface CategoryBlockProps {
  categories: CatalogCategory[];
}

const CategoryBlock = ({ categories }: CategoryBlockProps) => {
  return (
    <ul className="space-y-2 text-center md:text-left">
      {categories.map((category) => (
        <li key={category.id}>
          <Link href={category.href} className="text-base hover:underline">
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryBlock;
