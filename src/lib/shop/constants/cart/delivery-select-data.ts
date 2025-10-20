import UkrpostOffice from '@/components/shop/cart/ukrpost-office';

import NovapostOfficeIcon from '@/lib/shop/icons/novapost-office-icon';
import PickupIcon from '@/lib/shop/icons/pickup-icon';

export const deliveryOptions = [
  {
    id: 'pickup',
    label: 'Самовивіз із магазину',
    icon: PickupIcon,
    iconClassName: 'text-yellow h-full w-full',
  },
  {
    id: 'novaposhta',
    label: 'Доставка Нова Пошта',
    icon: NovapostOfficeIcon,
    iconClassName: 'h-full w-full',
  },
  {
    id: 'ukrposhta',
    label: 'Доставка Укрпошта',
    icon: UkrpostOffice,
    iconClassName: 'h-full w-full',
  },
];
