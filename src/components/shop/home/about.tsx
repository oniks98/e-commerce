import { aboutData } from '@/lib/shop/constants/home/about-data';

import clsx from 'clsx';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shop/ui/accordion';
import { ArrowDownIcon } from '@/lib/shop/icons';
import Shadow from '@/components/shop/ui/shadow';

const About = () => {
  return (
    <section className="relative">
      <div className="relative z-10 p-4 md:px-[110px] md:pt-[70px] md:pb-[30px]">
        <h2 className="text-dark mb-6 text-center text-3xl font-semibold md:mb-8">
          {aboutData.title}
        </h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="group relative border-none">
            <div className="relative">
              {/* Текст с line-clamp */}
              <div
                className={clsx(
                  'prose text-dark relative max-w-none',
                  'line-clamp-5 group-data-[state=open]:line-clamp-none',
                )}
              >
                <p>{aboutData.text[0]}</p>
              </div>

              {/* Градиент */}
              <div
                className={clsx(
                  'pointer-events-none absolute bottom-0 left-0 h-12 w-full bg-gradient-to-t from-white to-transparent transition-opacity',
                  'group-data-[state=open]:opacity-0',
                )}
              />
            </div>

            <AccordionContent>
              <div className="mt-4 space-y-3 text-base">
                {aboutData.services.map((s, i) => (
                  <p key={i}>{s}</p>
                ))}
              </div>
            </AccordionContent>

            <AccordionTrigger className="flex w-full items-center justify-center pt-4 [&>svg]:hidden [&[data-state=open]>div]:rotate-180">
              <Shadow>
                <ArrowDownIcon className="text-yellow h-[50px] w-[50px]" />
              </Shadow>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default About;
