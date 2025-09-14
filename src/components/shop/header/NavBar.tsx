import Link from 'next/link';
import CreditIcon from '@/lib/shop/icons/CreditIcon';
import SaleIcon from '@/lib/shop/icons/SaleIcon';
import AkciiIcon from '@/lib/shop/icons/AkciiIcon';
import clsx from 'clsx';

const navLinks = [
  {
    href: '/promotions',
    label: 'Акції',
    icon: <AkciiIcon className="text-yellow h-5 w-5" />,
  },
  {
    href: '/sale',
    label: 'Розпродаж',
    icon: <SaleIcon className="text-yellow h-6 w-6" />,
  },
  {
    href: '/credit',
    label: 'Купити в кредит',
    icon: <CreditIcon className="text-yellow h-5 w-5" />,
  },
];

const roomLinks = [
  { href: '/rooms/child', label: 'Дитяча' },
  { href: '/rooms/kitchen', label: 'Кухня' },
  { href: '/rooms/bathroom', label: 'Ванна' },
  { href: '/rooms/bedroom', label: 'Спальня' },
  { href: '/rooms/hallway', label: 'Передпокій' },
  { href: '/rooms/livingroom', label: 'Вітальня' },
  { href: '/rooms/office', label: 'Офіс' },
];

const NavBar = () => {
  return (
    <div className="border-light border-t-2 bg-white">
      <div
        className={clsx(
          'mx-auto flex h-[60px] max-w-[1360px] items-center justify-between px-[35px]',
          'text-grey',
        )}
      >
        <div className="flex items-center gap-[40px]">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="hover:text-yellow flex items-center gap-[10px] text-lg font-semibold"
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        <nav className="flex items-center gap-[40px]">
          {roomLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="hover:text-yellow text-lg font-semibold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
