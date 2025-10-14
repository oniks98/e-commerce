import Link from 'next/link';
import LocationIcon from '@/lib/shop/icons/location-icon';
import PaymentIcon from '@/lib/shop/icons/payment-icon';
import WarrantyIcon from '@/lib/shop/icons/warranty-icon';
import HelpIcon from '@/lib/shop/icons/help-icon';
import ArrowUpRightIcon from '@/lib/shop/icons/arrow-up-right-icon';
import { conditionsData } from '@/lib/shop/constants/product/conditions-data';

const iconMap = {
  LocationIcon: <LocationIcon className="text-yellow" />,
  PaymentIcon: <PaymentIcon className="text-yellow" />,
  WarrantyIcon: <WarrantyIcon className="text-yellow" />,
  HelpIcon: <HelpIcon className="text-yellow" />,
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
                className="text-yellow flex items-center gap-x-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
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
