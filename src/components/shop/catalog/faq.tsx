'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqData } from '@/lib/shop/constants/faq-data';
import FaqQuestionIcon from '@/lib/shop/icons/faq-question-icon';

const Faq = () => {
  return (
    <div className="mx-auto max-w-[1070px] py-17">
      <h2 className="text-grey mb-6 text-center text-3xl font-semibold">
        Питання, які часто задають про Ліжка
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="flex items-center">
                <FaqQuestionIcon />
                <span className="ml-4 text-lg font-semibold">
                  {item.question}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-grey text-base">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
