'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shop/ui/accordion';

import { termsData } from '@/lib/shop/constants/terms/terms-data';
import { FaqQuestionIcon } from '@/lib/shop/icons';

const Faq = () => {
  return (
    <section className="mx-auto max-w-[1070px] pt-[70px] pb-[30px]">
      <h2 className="text-dark mb-6 text-center text-4xl leading-tight font-semibold">
        {termsData.faq.title}
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {termsData.faq.items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="flex items-center">
                <FaqQuestionIcon className="shrink-0" />
                <span className="ml-4 text-left text-[19px] font-semibold">
                  {item.question}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-dark text-base">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;
