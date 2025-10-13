// 'use client';

// import * as Tabs from '@radix-ui/react-tabs';
// import AllReviews from './AllReviews';
// import ProductReviews from './ProductReviews';
// import ShopReviews from './ShopReviews';

// export default function ReviewTabs() {
//   return (
//     <Tabs.Root defaultValue="all" className="w-full">
//       <Tabs.List className="flex gap-4 border-b border-gray-200">
//         <Tabs.Trigger
//           value="all"
//           className="data-[state=active]:font-semibold data-[state=active]:text-black text-gray-500"
//         >
//           Всі відгуки
//         </Tabs.Trigger>
//         <Tabs.Trigger
//           value="product"
//           className="data-[state=active]:font-semibold data-[state=active]:text-black text-gray-500"
//         >
//           Про товари
//         </Tabs.Trigger>
//         <Tabs.Trigger
//           value="shop"
//           className="data-[state=active]:font-semibold data-[state=active]:text-black text-gray-500"
//         >
//           Про магазин
//         </Tabs.Trigger>
//       </Tabs.List>

//       <Tabs.Content value="all">
//         <AllReviews />
//       </Tabs.Content>
//       <Tabs.Content value="product">
//         <ProductReviews />
//       </Tabs.Content>
//       <Tabs.Content value="shop">
//         <ShopReviews />
//       </Tabs.Content>
//     </Tabs.Root>
//   );
// }
