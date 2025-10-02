'use client';

import Image from 'next/image';
import Link from 'next/link';
import CategoryBlock from '@/components/shop/footer/category-block';
import ContactsBlock from '@/components/shop/footer/contacts-block';
import Copyright from '@/components/shop/footer/copyright';
import InfoBlock from '@/components/shop/footer/info-block';
import SocialBlock from '@/components/shop/footer/social-block';
import Logo from '@/components/shop/ui/logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shop/ui/accordion';
import { CategoryTreeItem } from '@/lib/shop/actions/category';

interface FooterProps {
  locale: string;
  catalogData: CategoryTreeItem[];
}

const Footer = ({ locale, catalogData }: FooterProps) => {
  const half = Math.ceil(catalogData.length / 2);
  const firstHalf = catalogData.slice(0, half);
  const secondHalf = catalogData.slice(half);

  return (
    <footer className="bg-footer-bg text-footer-text">
      <div className="mx-auto max-w-[1360px] px-4 py-16 md:px-[35px]">
        {/* Desktop Footer */}
        <div className="hidden md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4 xl:col-span-3">
            <div className="flex flex-col items-center md:items-center xl:mb-4 xl:flex-row">
              <div className="mt-[20px] h-[70px] w-[70px] shrink-0 overflow-hidden rounded-full bg-white md:mt-0 md:mb-[20px] xl:m-0">
                <Logo />
              </div>
              <div className="mt-[20px] text-center md:mt-0 xl:p-3 xl:text-left">
                <h3 className="text-lg font-semibold md:mb-[20px] xl:mb-0 xl:text-left">
                  💎 ONYX - для Вас безпека та комфорт
                </h3>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <SocialBlock />
            </div>
          </div>
          <div className="col-span-2 hidden xl:block">
            <h3 className="mb-4 text-lg font-semibold">Інформація</h3>
            <InfoBlock />
          </div>
          <div className="col-span-4">
            <h3 className="mb-4 text-lg font-semibold xl:text-center">
              Категорії
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-8">
              <CategoryBlock locale={locale} categories={firstHalf} />
              <CategoryBlock locale={locale} categories={secondHalf} />
            </div>
          </div>
          <div className="md:col-span-4 xl:col-span-3">
            <ContactsBlock />
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="flex flex-col items-center md:hidden">
          <div className="mb-8">
            <div className="flex flex-col items-center md:items-center xl:flex-row">
              <div className="mt-[20px] h-[80px] w-[80px] shrink-0 overflow-hidden rounded-full bg-white md:mt-0 md:mb-[20px] xl:m-0">
                <Logo />
              </div>
              <div className="mt-[20px] text-center md:mt-0 xl:ml-[30px] xl:text-left">
                <h3 className="text-lg font-semibold md:mb-[20px] xl:mb-0 xl:text-left">
                  💎 ONYX - для Вас безпека та комфорт
                </h3>
              </div>
            </div>
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
                <CategoryBlock locale={locale} categories={catalogData} />
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
