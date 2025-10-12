import { CategoryTreeItem } from '@/lib/shop/actions/category';
import Link from 'next/link';

interface CategoryBlockProps {
  categories: CategoryTreeItem[];
  locale: string;
}

const CategoryBlock = ({ categories, locale }: CategoryBlockProps) => {
  return (
    <nav>
      <ul className="space-y-2 text-center md:text-left">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/${locale}/catalog/${category.slug}`}
              className="text-base hover:underline"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryBlock;
