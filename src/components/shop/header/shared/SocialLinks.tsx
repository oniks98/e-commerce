import Link from 'next/link';
import WhatsappIcon from '@/lib/shop/icons/WhatsappIcon';
import TelegramIcon from '@/lib/shop/icons/TelegramIcon';
import ViberIcon from '@/lib/shop/icons/ViberIcon';
import { motion } from 'framer-motion';

interface SocialLinksProps {
  className?: string;
}

const SocialLinks = ({ className = '' }: SocialLinksProps) => {
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
  );
};

export default SocialLinks;
