'use client';
import { footerData } from '@/lib/shop/constants/footer-data';
import SocialLinks from '@/components/shop/ui/social-links';
import Link from 'next/link';

const SocialBlock = () => {
  const { messengers, information } = footerData;

  return (
    <div className="flex flex-col items-center md:items-start">
      {/* Social Links Section */}
      <h3 className="mb-[10px] text-center text-lg font-semibold md:text-left">
        {messengers.title}
      </h3>
      <SocialLinks iconSize="lg" />

      {/* Info Block - Only visible from md to xl screens (768px - 1279px) */}
      <nav className="hidden md:mt-8 md:block xl:hidden">
        <h3 className="mb-4 text-lg font-semibold">{information.title}</h3>
        <ul className="space-y-2">
          {information.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-base hover:underline">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SocialBlock;
