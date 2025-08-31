import { createNavigation } from 'next-intl/navigation';
import { adminRouting } from './admin-routing';

export const {
  Link: AdminLink,
  redirect: adminRedirect,
  usePathname: useAdminPathname,
  useRouter: useAdminRouter,
} = createNavigation(adminRouting);
