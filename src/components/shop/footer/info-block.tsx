import Link from 'next/link';

import { footerData } from '@/lib/shop/constants/footer-data';

const InfoBlock = () => {
  const { information } = footerData;

  return (
    <nav className="flex flex-col items-center md:items-start">
      <ul className="space-y-2 text-center md:text-left">
        {information.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-base hover:underline">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default InfoBlock;
