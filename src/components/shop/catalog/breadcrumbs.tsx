import Link from 'next/link';

import RightArrowIcon from '@/lib/shop/icons/right-arrow-icon';

const Breadcrumbs = () => {
  return (
    <nav className="text-grey flex items-center py-1 text-base font-normal">
      <Link href="/" className="text-grey hover:text-yellow-dark">
        Головна
      </Link>
      <span className="mx-2">
        <RightArrowIcon />
      </span>
      <span className="text-yellow">ЛІжка</span>
    </nav>
  );
};

export default Breadcrumbs;
