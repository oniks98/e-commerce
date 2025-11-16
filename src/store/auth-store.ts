import { AuthChangeEvent, User } from '@supabase/supabase-js';
import { create } from 'zustand';

import { useFavoritesStore } from './favorites-store';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null, event?: AuthChangeEvent) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user, event) => {
    set({ user, isLoading: false });
    if (user) {
      useFavoritesStore.getState().syncWithSupabase(user);
    } else if (event === 'SIGNED_OUT') {
      useFavoritesStore.getState().handleLogout();
    }
  },
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => {
    set({ user: null });
    useFavoritesStore.getState().handleLogout();
  },
}));
