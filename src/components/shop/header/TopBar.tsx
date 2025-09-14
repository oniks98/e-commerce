'use client';

import Link from 'next/link';
import { LanguageSwitcher } from '@/components/shop/ui/language-switcher';
import WhatsappIcon from '@/lib/shop/icons/WhatsappIcon';
import TelegramIcon from '@/lib/shop/icons/TelegramIcon';
import ViberIcon from '@/lib/shop/icons/ViberIcon';
import { ThemeToggle } from '@/components/shop/ui/ThemeToggle';
import RegistrationIcon from '@/lib/shop/icons/RegistrationIcon';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const infoLinks = [
  { href: '/about', label: 'Про нас' },
  { href: '/promotions', label: 'Акції та знижки' },
  { href: '/terms', label: 'Умови покупки' },
  { href: '/reviews', label: 'Відгуки' },
  { href: '/blog', label: 'Цікаво' },
  { href: '/contacts', label: 'Контакти' },
];

const TopBar = () => {
  return (
    <div className="bg-light">
      <div
        className={clsx(
          'mx-auto flex h-[60px] max-w-[1360px] items-center justify-between px-[35px]',
          'text-grey',
        )}
      >
        <nav className="flex items-center gap-[30px]">
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

        <div className="flex items-center gap-[20px]">
          <div className="text-base leading-[30px] font-normal">
            Допомога і консультація:
          </div>
          <div className="flex items-center gap-[10px]">
            <motion.div
              whileInView={{ rotate: 360 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: 0,
                ease: 'easeOut',
              }}
            >
              <Link
                href="https://wa.me/+380633388260"
                aria-label="Whatsapp"
                className="block transition-colors duration-300 hover:text-green-500"
              >
                <WhatsappIcon className="h-[30px] w-[30px] transition-transform duration-300 hover:scale-110" />
              </Link>
            </motion.div>
            <motion.div
              whileInView={{ rotate: 360 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: 'easeOut',
              }}
            >
              <Link
                href="https://t.me/+380633388260"
                aria-label="Telegram"
                className="block transition-colors duration-300 hover:text-blue-500"
              >
                <TelegramIcon className="h-[30px] w-[30px] transition-transform duration-300 hover:scale-110" />
              </Link>
            </motion.div>
            <motion.div
              whileInView={{ rotate: 360 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: 'easeOut',
              }}
            >
              <Link
                href="viber://chat?number=+380633388260"
                aria-label="Viber"
                className="block transition-colors duration-300 hover:text-purple-500"
              >
                <ViberIcon className="h-[30px] w-[30px] transition-transform duration-300 hover:scale-110" />
              </Link>
            </motion.div>
          </div>
          <div className="flex items-center gap-[10px]">
            <LanguageSwitcher />
            <ThemeToggle />
            <button aria-label="Registration" className="hover:text-yellow p-2">
              <RegistrationIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
