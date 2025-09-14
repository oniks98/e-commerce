import Link from 'next/link';
import CreditIcon from '@/lib/shop/icons/CreditIcon';
import SaleIcon from '@/lib/shop/icons/SaleIcon';
import AkciiIcon from '@/lib/shop/icons/AkciiIcon';
import clsx from 'clsx';

const infoLinks = [
  { href: '/about', label: 'Про нас' },
  { href: '/payment', label: 'Оплата' },
  { href: '/delivery', label: 'Доставка та збірка' },
  { href: '/reviews', label: 'Відгуки' },
  { href: '/blog', label: 'Блог' },
  { href: '/contacts', label: 'Контакти' },
];

const categoryLinks = [
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-40 bg-black"
      onClick={onClose}
    >
      <div
        className="absolute top-0 left-0 h-full w-full max-w-md bg-white p-[35px]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
      >
        <nav className="flex flex-col gap-[40px]">
          {/* Info Links */}
          <div className="flex flex-col gap-4">
            {infoLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="text-dark hover:text-yellow text-xl font-semibold"
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Category Links */}
          <div className="flex flex-col gap-4">
            {categoryLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="text-grey hover:text-yellow flex items-center gap-[10px] text-lg font-semibold"
                onClick={onClose}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
