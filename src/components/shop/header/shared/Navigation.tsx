import Link from 'next/link';

interface NavigationProps {
  className?: string;
}

const infoLinks = [
  { href: '/about', label: 'Про нас' },
  { href: '/promotions', label: 'Акції та знижки' },
  { href: '/terms', label: 'Умови покупки' },
  { href: '/reviews', label: 'Відгуки' },
  { href: '/blog', label: 'Цікаво' },
  { href: '/contacts', label: 'Контакти' },
];

const Navigation = ({ className = '' }: NavigationProps) => {
  return (
    <nav className={`flex items-center gap-[30px] ${className}`}>
      {infoLinks.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className="hover:text-yellow text-base leading-[30px] font-normal"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
