'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import AllReviews from '@/components/shop/reviews/all-reviews';
import ProductReviews from '@/components/shop/reviews/product-reviews';
import ShopReviews from '@/components/shop/reviews/shop-reviews';
import ReviewTabs from '@/components/shop/reviews/review-tabs';

export default function ReviewsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    (searchParams.get('tab') as string) || 'all',
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/reviews?tab=${tab}`, { scroll: false });
  };

  return (
    <>
      <ReviewTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mt-10">
          {activeTab === 'all' && <AllReviews />}
          {activeTab === 'products' && <ProductReviews />}
          {activeTab === 'shop' && <ShopReviews />}
        </div>
      </Suspense>
    </>
  );
}
