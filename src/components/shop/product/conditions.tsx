import Link from 'next/link';

import { conditionsData } from '@/lib/shop/constants/product/conditions-data';
import {
  LocationIcon,
  PaymentIcon,
  WarrantyIcon,
  HelpIcon,
  ArrowUpRightIcon,
} from '@/lib/shop/icons';

const iconMap = {
  LocationIcon: <LocationIcon className="text-sky" />,
  PaymentIcon: <PaymentIcon className="text-sky" />,
  WarrantyIcon: <WarrantyIcon className="text-sky" />,
  HelpIcon: <HelpIcon className="text-sky" />,
};

interface ConditionsProps {
  locale: string;
}

const Conditions = ({ locale }: ConditionsProps) => {
  return (
    <section className="grid grid-cols-1 gap-5 py-8 md:mx-auto md:grid-cols-2 xl:grid-cols-4">
      <ul className="contents">
        {conditionsData.map((item, index) => (
          <li key={index} className="flex items-center gap-x-5">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-white">
              {iconMap[item.icon as keyof typeof iconMap]}
            </div>
            <div>
              <h4 className="text-dark mb-1 text-xl font-semibold">
                {item.title}
              </h4>
              <p className="text-grey mb-2 text-sm">{item.description}</p>
              <Link
                href={`/${locale}/terms`}
                className="text-sky hover:text-sky-dark flex items-center gap-x-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
              >
                Детальніше <ArrowUpRightIcon />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Conditions;
