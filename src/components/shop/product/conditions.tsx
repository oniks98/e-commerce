import Link from 'next/link';
import LocationIcon from '@/lib/shop/icons/location-icon';
import PaymentIcon from '@/lib/shop/icons/payment-icon';
import WarrantyIcon from '@/lib/shop/icons/warranty-icon';
import HelpIcon from '@/lib/shop/icons/help-icon';
import ArrowUpRightIcon from '@/lib/shop/icons/arrow-up-right-icon';

const conditionsData = [
  {
    icon: <LocationIcon className="text-yellow" />,
    title: 'Доставка',
    description: 'Доставка по всій Україні',
  },
  {
    icon: <PaymentIcon className="text-yellow" />,
    title: 'Оплата',
    description: 'Карткою на сайті, готівкою або через термінал',
  },
  {
    icon: <WarrantyIcon className="text-yellow" />,
    title: 'Гарантія',
    description: 'Гарантія від виробника до 2 років',
  },
  {
    icon: <HelpIcon className="text-yellow" />,
    title: 'Підтримка',
    description: 'Безкоштовна консультація по вибору товара',
  },
];

interface ConditionsProps {
  locale: string;
}

const Conditions = ({ locale }: ConditionsProps) => {
  return (
    <section className="grid grid-cols-1 gap-5 py-8 md:mx-auto md:grid-cols-2 xl:grid-cols-4">
      {conditionsData.map((item, index) => (
        <div key={index} className="flex items-center gap-x-5">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-white">
            {item.icon}
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
        </div>
      ))}
    </section>
  );
};

export default Conditions;
