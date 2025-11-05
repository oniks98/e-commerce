'use client';

import clsx from 'clsx';

type TabType = 'all' | 'products' | 'shop';

interface ReviewTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function ReviewTabs({
  activeTab,
  onTabChange,
}: ReviewTabsProps) {
  const tabs: Array<{ id: TabType; label: string }> = [
    { id: 'all', label: 'Всі відгуки' },
    { id: 'products', label: 'Про товари' },
    { id: 'shop', label: 'Про магазин' },
  ];

  return (
    <nav className="border-b-3 border-white" aria-label="Навігація по відгуках">
      <div className="-mb-[3px] flex gap-[30px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={clsx('h4-headline border-b-3 pb-2.5', {
              'border-sky text-sky': activeTab === tab.id,
              'text-dark border-transparent': activeTab !== tab.id,
            })}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
