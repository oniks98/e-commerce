'use client';

import { CategoryCard, CategoryWithCount } from './category-card';

interface CategoriesProps {
  locale: string;
  catalogData: CategoryWithCount[];
}

const Categories = ({ locale, catalogData }: CategoriesProps) => {
  const categories = catalogData.slice(0, 12);

  return (
    <section className="py-[35px]">
      <div className="mx-auto">
        <h1 className="mb-[35px] text-left text-4xl font-semibold">
          Популярні категорії
        </h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-7">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              locale={locale}
              isPriority={index < 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
