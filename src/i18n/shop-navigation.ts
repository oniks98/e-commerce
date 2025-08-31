import { createNavigation } from 'next-intl/navigation';
import { shopRouting } from './shop-routing';

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(shopRouting);
