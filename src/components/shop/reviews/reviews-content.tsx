'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AllReviews from '@/components/shop/reviews/all-reviews';
import ProductReviews from '@/components/shop/reviews/product-reviews';
import ShopReviews from '@/components/shop/reviews/shop-reviews';
import ReviewTabs from '@/components/shop/reviews/review-tabs';

type TabType = 'all' | 'products' | 'shop';

export default function ReviewsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>(
    (searchParams.get('tab') as TabType) || 'all',
  );

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    router.push(`/reviews?tab=${tab}`, { scroll: false });
  };

  return (
    <div>
      <ReviewTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="mt-10">
        {activeTab === 'all' && <AllReviews />}
        {activeTab === 'products' && <ProductReviews />}
        {activeTab === 'shop' && <ShopReviews />}
      </div>
    </div>
  );
}
