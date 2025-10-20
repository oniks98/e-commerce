import { termsData } from '@/lib/shop/constants/terms/terms-data';
import { NovapostOfficeIcon, PickupIcon } from '@/lib/shop/icons';
import UkrpostOffice from '@/components/shop/cart/ukrpost-office';

const icons: { [key: string]: React.ComponentType<any> } = {
  NovapostOfficeIcon: NovapostOfficeIcon,
  PickupIcon: PickupIcon,
  UkrpostOffice: UkrpostOffice,
};

const DeliveryMethods = () => {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
        <h2 className="mb-9 text-center text-4xl font-semibold">
          {termsData.deliveryMethods.title}
        </h2>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {termsData.deliveryMethods.options.map((option, index) => {
            const Icon = icons[option.icon];
            return (
              <li
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-5 h-20 w-20">
                  {Icon && <Icon className={option.className} />}
                </div>
                <h3 className="mb-5 text-xl font-semibold">{option.title}</h3>
                <p className="">{option.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default DeliveryMethods;
