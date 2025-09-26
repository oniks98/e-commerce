import Link from 'next/link';
import { WhatsappIcon, TelegramIcon, ViberIcon } from '@/lib/shop/icons';
import { motion } from 'framer-motion';

interface SocialLinksProps {
  className?: string;
  iconSize?: 'sm' | 'lg';
}

const SocialLinks = ({ className = '', iconSize = 'sm' }: SocialLinksProps) => {
  const iconSizeClass =
    iconSize === 'lg' ? 'h-[40px] w-[40px]' : 'h-[30px] w-[30px]';
  return (
    <div className={`flex items-center gap-[10px] ${className}`}>
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
          className="block transition-colors duration-200 hover:text-green-500"
        >
          <WhatsappIcon
            className={`${iconSizeClass} transition-transform duration-200 hover:scale-110`}
          />
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
          className="block transition-colors duration-200 hover:text-blue-500"
        >
          <TelegramIcon
            className={`${iconSizeClass} transition-transform duration-200 hover:scale-110`}
          />
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
          className="block transition-colors duration-200 hover:text-purple-500"
        >
          <ViberIcon
            className={`${iconSizeClass} transition-transform duration-200 hover:scale-110`}
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default SocialLinks;
