import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createClient } from '@/lib/supabase/client';

import type { User } from '@supabase/supabase-js';

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug?: string;
  sku: string;
}

type ProductRow = {
  id: string;
  name: string;
  price: number;
  images: string[] | null;
  slug: string | null;
  sku: string | null;
};

interface FavoritesState {
  items: FavoriteItem[];
  syncWithSupabase: (user: User) => Promise<void>;
  handleLogout: () => void;
  toggleItem: (item: FavoriteItem, user: User | null) => Promise<void>;
  isFavorite: (id: string) => boolean;
  getTotalItems: () => number;
}

const supabase = createClient();

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      syncWithSupabase: async (user) => {
        // On login, ignore local state and fetch directly from the database.
        // This overwrites any anonymous favorites.
        const { data: finalFavoriteIds, error: finalFetchError } =
          await supabase
            .from('user_favorites')
            .select('product_id')
            .eq('user_id', user.id);

        if (finalFetchError) {
          console.error(
            'Error fetching final favorites list:',
            JSON.stringify(finalFetchError, null, 2),
          );
          set({ items: [] }); // On error, clear the list
          return;
        }

        const finalProductIds = finalFavoriteIds.map(
          (f: { product_id: string }) => f.product_id,
        );

        // 4. Fetch product details for the final list
        if (finalProductIds.length > 0) {
          const { data: products, error: productsError } = await supabase
            .from('products')
            .select('id, name, price_uah, sku') // Corrected columns
            .in('id', finalProductIds);

          if (productsError) {
            console.error(
              'Error fetching product details for favorites:',
              JSON.stringify(productsError, null, 2),
            );
            set({ items: [] }); // Clear items on error
            return;
          }

          // The 'name' is a jsonb object, we need a locale to parse it.
          // This is a temporary fix, just picking 'uk' as default.
          // A proper fix would involve passing the locale down to this function.
          const finalItems = products.map((p: any) => ({
            id: p.id,
            name: p.name?.uk || p.name?.en || 'Unnamed Product', // Handle localized name
            price: p.price_uah, // Corrected price column
            image: '/images/logo.png', // Placeholder for non-existent image column
            slug: '', // Placeholder for non-existent slug column
            sku: p.sku,
          }));
          set({ items: finalItems });
        } else {
          // If the user has no favorites in the DB, ensure the state is empty.
          set({ items: [] });
        }
      },


      handleLogout: () => {
        set({ items: [] });
      },

      toggleItem: async (item, user) => {
        const currentItems = get().items;
        const isCurrentlyFavorite = currentItems.some((i) => i.id === item.id);

        const newItems = isCurrentlyFavorite
          ? currentItems.filter((i) => i.id !== item.id)
          : [...currentItems, item];
        set({ items: newItems });

        if (user) {
          if (isCurrentlyFavorite) {
            const { error } = await supabase
              .from('user_favorites')
              .delete()
              .match({ user_id: user.id, product_id: item.id });
            if (error) {
              console.error(
                'Error removing favorite from Supabase:',
                JSON.stringify(error, null, 2),
              );
              set({ items: currentItems });
            }
          } else {
            const { error } = await supabase
              .from('user_favorites')
              .insert({ user_id: user.id, product_id: item.id });
            if (error) {
              console.error(
                'Error adding favorite to Supabase:',
                JSON.stringify(error, null, 2),
              );
              set({ items: currentItems });
            }
          }
        }
      },

      isFavorite: (id) => get().items.some((item) => item.id === id),

      getTotalItems: () => get().items.length,
    }),
    {
      name: 'favorites-storage',
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
