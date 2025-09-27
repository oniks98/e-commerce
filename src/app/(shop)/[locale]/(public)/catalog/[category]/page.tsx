// import { getTranslations } from 'next-intl/server';
// import Breadcrumbs from '@/components/shop/catalog/breadcrumbs';
// import Subcategories from '@/components/shop/catalog/subcategories';
// import SearchFilter from '@/components/shop/catalog/search-filter';
// import Sorting from '@/components/shop/catalog\sorting';
// import Products from '@/components/shop/catalog\products';
// import BtnLoadMore from '@/components/ui\btn-load-more';
// import Pagination from '@/components/shop\catalog\pagination';
// import SeoText from '@/components/shop\catalog\seo-text';
// import Reviews from '@/components/shop/reviews/reviews';
// import Question from '@/components/shop/catalog\question';
// import Advantages from '@/components/ui\advantages';

// export default async function CategoryPage({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }) {
//   const { locale } = await params;

//   return (
//     <div className="bg-light">
//       <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
//         <Breadcrumbs />
//         <Subcategories />
//         <div className="flex">
//           <SearchFilter />
//           <div className="flex flex-col">
//             <Sorting />
//             <Products />
//           </div>
//         </div>
//         <BtnLoadMore />
//         <Pagination />
//         <SeoText />
//       </div>
//       <Reviews />
//       <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
//         <Question />
//         <Advantages />
//       </div>
//     </div>
//   );
// }
