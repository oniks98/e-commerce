import { aboutData } from '@/lib/shop/constants/about-data';
import { getPlaceholder } from '@/lib/shop/media/cloudinary';
import clsx from 'clsx';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowDownIcon,
  QualityIcon,
  PriceIcon,
  DeliveryIcon,
  OriginalIcon,
} from '@/lib/shop/icons';

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
              <AccordionItem
                value="item-1"
                className="group relative border-none"
              >
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
                  <Icon className="h-20 w-20" />
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
