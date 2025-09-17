import { getTranslations } from 'next-intl/server';
import Hero from '@/components/shop/hero/hero';

export default async function HomePage() {
  return (
    <div className="bg-light">
      <div className="mx-auto max-w-[1360px] px-[35px]">
        <Hero className="py-[35px]" />
      </div>
    </div>
  );
}
