import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug?: string;
  sku: string;
}

interface FavoritesStore {
  items: FavoriteItem[];
  addItem: (item: FavoriteItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  getTotalItems: () => number;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);

        if (!existingItem) {
          set({ items: [...items, item] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      toggleItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          get().removeItem(item.id);
        } else {
          get().addItem(item);
        }
      },

      isFavorite: (id) => {
        return get().items.some((item) => item.id === id);
      },

      clearFavorites: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: 'favorites-storage',
    },
  ),
);
