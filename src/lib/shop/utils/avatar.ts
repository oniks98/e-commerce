import type { User } from '@supabase/supabase-js';

export const getInitials = (name: string): string => {
  if (!name) return '?';

  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-[#FF6B6B]', // red
    'bg-[#4ECDC4]', // teal
    'bg-[#45B7D1]', // blue
    'bg-[#FFA07A]', // salmon
    'bg-[#98D8C8]', // mint
    'bg-[#F7DC6F]', // yellow
    'bg-[#BB8FCE]', // purple
    'bg-[#85C1E2]', // light blue
    'bg-[#F8B195]', // peach
    'bg-[#A8E6CF]', // green
  ];

  const charCode = name.charCodeAt(0) || 0;
  return colors[charCode % colors.length];
};

export const getUserName = (user: User | null): string => {
  if (!user) return '';

  return (
    user.user_metadata?.name ||
    user.user_metadata?.display_name ||
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    ''
  );
};
