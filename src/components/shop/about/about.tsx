import { aboutData } from '@/lib/shop/constants/about-data';
import { getPlaceholder } from '@/lib/shop/media/cloudinary';
import clsx from 'clsx';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ArrowDownIcon from '@/lib/shop/icons/arrow-down-icon';
import QualityIcon from '@/lib/shop/icons/quality-icon';
import PriceIcon from '@/lib/shop/icons/price-icon';
import DeliveryIcon from '@/lib/shop/icons/delivery-icon';
import OriginalIcon from '@/lib/shop/icons/original-icon';

const iconMap = {
  delivery: DeliveryIcon,
  original: OriginalIcon,
  quality: QualityIcon,
  price: PriceIcon,
};

const About = () => {
  return (
    <section className="bg-white py-[70px]">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
        <div className="relative">
          <div className="relative z-10 p-4 md:px-[110px] md:py-[70px]">
            <h2 className="text-dark mb-6 text-center text-2xl font-semibold md:mb-8 md:text-4xl">
              {aboutData.title}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-none">
                <div className="overflow-hidden">
                  <div className="prose text-dark max-w-none">
                    <p>{aboutData.text[0]}</p>
                    <AccordionContent>
                      <div className="mt-4 space-y-3 text-base">
                        {aboutData.services.map((s, i) => (
                          <p key={i}>{s}</p>
                        ))}
                      </div>
                    </AccordionContent>
                  </div>
                </div>
                <AccordionTrigger className="flex w-full items-center justify-center pt-4 [&>svg]:hidden [&[data-state=open]>div]:rotate-180">
                  <div className="flex h-15 w-15 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200">
                    <ArrowDownIcon className="text-yellow h-[50px] w-[50px]" />
                  </div>
                </AccordionTrigger>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div
          className={clsx(
            'grid grid-cols-2 gap-5',
            'place-items-center xl:grid-cols-4 xl:gap-5',
          )}
        >
          {aboutData.advantages.map((advantage, index) => {
            const Icon = iconMap[advantage.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="flex flex-col items-center md:flex-row md:text-left"
              >
                <div className="mb-5 flex-shrink-0 md:mr-5 md:mb-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
                    <Icon className="h-10 w-10" />
                  </div>
                </div>
                <h4 className="text-dark text-base font-semibold md:text-xl">
                  {advantage.title}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
