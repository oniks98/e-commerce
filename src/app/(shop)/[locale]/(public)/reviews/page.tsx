// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import ReviewTabs from './components/ReviewTabs';
// import AllReviews from './components/AllReviews';
// import ProductReviews from './components/ProductReviews';
// import ShopReviews from './components/ShopReviews';

// type TabType = 'all' | 'products' | 'shop';

// export default function ReviewsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [activeTab, setActiveTab] = useState<TabType>(
//     (searchParams.get('tab') as TabType) || 'all'
//   );

//   // Синхронізація з URL
//   const handleTabChange = (tab: TabType) => {
//     setActiveTab(tab);
//     router.push(`/reviews?tab=${tab}`, { scroll: false });
//   };

//   return (
//     <section className="container mx-auto py-8">
//       <h1 className="text-2xl font-bold mb-6">Відгуки</h1>

//       <ReviewTabs activeTab={activeTab} onTabChange={handleTabChange} />

//       {activeTab === 'all' && <AllReviews />}
//       {activeTab === 'products' && <ProductReviews />}
//       {activeTab === 'shop' && <ShopReviews />}
//     </section>
//   );
// }
