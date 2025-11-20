'use client';

import ProfileSidebar from '@/components/shop/ui/profile-sidebar';

import { useAuthStore } from '@/store/auth-store';

interface ConditionalProfileLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalProfileLayout({
  children,
}: ConditionalProfileLayoutProps) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <ProfileSidebar className="hidden lg:block" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
