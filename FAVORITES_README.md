# Система обраних товарів (Favorites)

## Створені файли

### 1. Store (Zustand + LocalStorage)
**Файл:** `src/store/favorites-store.ts`

Стан управління обраними товарами з автоматичним збереженням в LocalStorage:
- `items` - масив обраних товарів
- `addItem` - додати товар в обране
- `removeItem` - видалити товар з обраного
- `toggleItem` - перемкнути стан (додати/видалити)
- `isFavorite` - перевірити чи товар в обраному
- `clearFavorites` - очистити всі обрані товари
- `getTotalItems` - отримати кількість обраних товарів

### 2. Компоненти

#### `src/components/shop/favorites/favorites-indicator.tsx`
Індикатор обраних товарів для хедера (аналогічно CartIndicator):
- Відображає іконку з кількістю обраних товарів
- Hydration-safe (попереджає помилки SSR)

#### `src/components/shop/favorites/favorites.tsx`
Основний компонент сторінки обраних товарів:
- Відображення списку обраних товарів у вигляді сітки
- Можливість видалити товар з обраного
- Додавання товарів у кошик
- Додавання всіх товарів у кошик одразу
- Очищення всіх обраних товарів
- Empty state коли немає обраних товарів

### 3. Сторінка
**Файл:** `src/app/(shop)/[locale]/(public)/favorites/page.tsx`

Server Component сторінка з:
- Breadcrumbs навігацією
- Інтеграцією компонента Favorites
- Підтримкою локалізації

### 4. Оновлені компоненти

#### `src/components/shop/ui/product-card.tsx`
Додано функціонал обраного:
- Кнопка додавання/видалення з обраного
- Візуальна індикація стану (активний/неактивний)
- Зміна кольору кнопки в залежності від стану

#### `src/components/shop/header/shared/action-buttons.tsx`
Додано:
- FavoritesIndicator з лінком на `/favorites`
- Консистентний дизайн з CartIndicator

## Використання

### Додавання товару в обране з будь-якого місця:

```tsx
import { useFavoritesStore } from '@/store/favorites-store';

const toggleFavorite = useFavoritesStore((state) => state.toggleItem);

toggleFavorite({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.image,
  slug: product.slug,
  sku: product.sku,
});
```

### Перевірка чи товар в обраному:

```tsx
const isFavorite = useFavoritesStore((state) => state.isFavorite);
const inFavorites = isFavorite(product.id);
```

### Отримання всіх обраних товарів:

```tsx
const items = useFavoritesStore((state) => state.items);
```

## Особливості реалізації

1. **LocalStorage** - автоматичне збереження через Zustand persist middleware
2. **Hydration-safe** - правильна робота з SSR/CSR
3. **TypeScript** - повна типізація
4. **Responsive design** - адаптивна сітка для всіх пристроїв
5. **UX анімації** - smooth transitions, feedback при діях
6. **Accessibility** - aria-labels для всіх інтерактивних елементів

## Навігація

- Хедер → Іконка обраного (з індикатором) → `/[locale]/favorites`
- Product Card → Кнопка серця → Toggle favorite
- Favorites Page → Кнопка видалення → Remove from favorites
- Favorites Page → "Додати все в кошик" → Bulk add to cart
