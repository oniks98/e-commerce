'use client';

import clsx from 'clsx';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shop/ui/accordion';
import Shadow from '@/components/shop/ui/shadow';

import { seoText } from '@/lib/shop/constants/catalog/seo-text-data';
import { ArrowDownIcon, CheckIcon } from '@/lib/shop/icons';

const SeoText = () => {
  return (
    <div className="relative mb-8 flex justify-center py-8 xl:justify-end">
      <div className="max-w-240">
        <h2 className="text-dark mb-6 text-center text-4xl font-semibold">
          {seoText.title}
        </h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="group relative border-none">
            <div className="relative">
              <div
                className={clsx(
                  'prose text-dark relative max-w-none',
                  'line-clamp-[10] group-data-[state=open]:line-clamp-none',
                )}
              >
                {seoText.paragraphs.map((p, i) => (
                  <p key={i} className="mb-4">
                    {p}
                  </p>
                ))}
                <h3 className="text-dark mt-6 mb-4 text-xl font-semibold">
                  {seoText.list.title}
                </h3>
                <ul>
                  {seoText.list.items.map((item, i) => (
                    <li key={i} className="mb-2 flex items-center">
                      <CheckIcon className="mr-2 h-6 w-6 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-dark mt-4">{seoText.additionalText}</p>
              </div>

              <div
                className={clsx(
                  'pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white to-transparent transition-opacity',
                  'group-data-[state=open]:opacity-0',
                )}
              />
            </div>

            <AccordionContent className="hidden" />

            <AccordionTrigger className="flex w-full items-center justify-center pt-4 [&>svg]:hidden [&[data-state=open]>div]:rotate-180">
              <Shadow>
                <ArrowDownIcon className="text-yellow h-[50px] w-[50px]" />
              </Shadow>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SeoText;
