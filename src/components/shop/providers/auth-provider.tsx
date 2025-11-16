'use client';

import { useEffect } from 'react';

import { AuthChangeEvent, Session } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/client';

import { useAuthStore } from '@/store/auth-store';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, setLoading } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null, event);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, setUser, setLoading]);

  return <>{children}</>;
}
