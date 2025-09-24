import Image from 'next/image';
import Link from 'next/link';
import CategoryBlock from '@/components/shop/footer/category-block';
import ContactsBlock from '@/components/shop/footer/contacts-block';
import Copyright from '@/components/shop/footer/copyright';
import InfoBlock from '@/components/shop/footer/info-block';
import SocialBlock from '@/components/shop/footer/social-block';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { catalogData } from '@/lib/shop/constants/catalog-data';

const Footer = () => {
  const half = Math.ceil(catalogData.length / 2);
  const firstHalf = catalogData.slice(0, half);
  const secondHalf = catalogData.slice(half);

  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-[1360px] px-4 py-16 md:px-[35px]">
        {/* Desktop Footer */}
        <div className="hidden md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4 xl:col-span-3">
            <Link href="/" className="mb-8 inline-block">
              <Image
                src="/images/logo-footer.png"
                alt="Onyx Logo"
                width={250}
                height={50}
              />
            </Link>
            <div className="flex flex-col gap-8">
              <SocialBlock />
            </div>
          </div>
          <div className="col-span-2 hidden xl:block">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Інформація
            </h3>
            <InfoBlock />
          </div>
          <div className="col-span-4">
            <h3 className="mb-4 text-lg font-semibold text-white xl:text-center">
              Категорії
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-8">
              <CategoryBlock categories={firstHalf} />
              <CategoryBlock categories={secondHalf} />
            </div>
          </div>
          <div className="md:col-span-4 xl:col-span-3">
            <ContactsBlock />
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="flex flex-col items-center md:hidden">
          <div className="mb-8">
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/images/logo-footer.png"
                alt="Onyx Logo"
                width={250}
                height={50}
              />
            </Link>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="justify-center text-xl leading-[1.4] font-semibold">
                Інформація
              </AccordionTrigger>
              <AccordionContent>
                <InfoBlock />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="justify-center text-xl leading-[1.4] font-semibold">
                Категорії
              </AccordionTrigger>
              <AccordionContent>
                <CategoryBlock categories={catalogData} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-8">
            <ContactsBlock />
          </div>
          <div className="mt-8">
            <SocialBlock />
          </div>
        </div>
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;
