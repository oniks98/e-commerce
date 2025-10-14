'use client';

import clsx from 'clsx';

interface ReviewTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ReviewTabs({
  activeTab,
  onTabChange,
}: ReviewTabsProps) {
  const tabs = [
    { id: 'all', label: 'Всі відгуки' },
    { id: 'products', label: 'Про товари' },
    { id: 'shop', label: 'Про магазин' },
  ];

  return (
    <div className="border-b-3 border-white">
      <div className="-mb-[3px] flex gap-[30px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={clsx('h4-headline border-b-3 pb-2.5', {
              'border-yellow text-yellow': activeTab === tab.id,
              'text-dark border-transparent': activeTab !== tab.id,
            })}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
