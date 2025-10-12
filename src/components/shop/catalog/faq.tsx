'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shop/ui/accordion';
import { faqData } from '@/lib/shop/constants/catalog/faq-data';
import FaqQuestionIcon from '@/lib/shop/icons/faq-question-icon';

const Faq = () => {
  return (
    <div className="mx-auto max-w-[1070px] pt-[70px] pb-[30px]">
      <h2 className="text-dark mb-6 text-center text-4xl font-semibold">
        Питання, які часто задають про Ліжка
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="flex items-center">
                <FaqQuestionIcon className="shrink-0" />
                <span className="ml-4 text-left text-lg font-semibold">
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
    </div>
  );
};

export default Faq;
