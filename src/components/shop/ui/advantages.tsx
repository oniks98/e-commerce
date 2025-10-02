import clsx from 'clsx';
import { aboutData } from '@/lib/shop/constants/about-data';
import {
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

const Advantages = () => {
  return (
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
  );
};

export default Advantages;
