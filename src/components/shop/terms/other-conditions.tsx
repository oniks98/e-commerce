import { termsData } from '@/lib/shop/constants/terms/terms-data';
import {
  GuaranteeIcon,
  ReturnsExchangesIcon,
  RefundIcon,
  DeliverySelectIcon,
} from '@/lib/shop/icons';

const icons: { [key: string]: React.ComponentType<any> } = {
  GuaranteeIcon: GuaranteeIcon,
  ReturnsExchangesIcon: ReturnsExchangesIcon,
  RefundIcon: RefundIcon,
  DeliverySelectIcon: DeliverySelectIcon,
};

const OtherConditions = () => {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
        <h2 className="mb-9 text-center text-4xl font-semibold">
          {termsData.otherConditions.title}
        </h2>
        <ul className="flex flex-col gap-8">
          {termsData.otherConditions.options.map((option, index) => {
            const Icon = icons[option.icon];
            return (
              <li
                key={index}
                className="flex flex-col items-center md:flex-row md:items-start"
              >
                <div className="mb-5 h-25 w-25 flex-shrink-0 md:mr-5 md:mb-0">
                  <div className="bg-yellow flex h-full w-full items-center justify-center rounded-full">
                    {Icon && <Icon className="h-full w-full text-white" />}
                  </div>
                </div>
                <div className="w-full md:text-left">
                  <h3 className="mb-5 text-xl font-semibold">{option.title}</h3>
                  <p className="leading-normal whitespace-pre-line">
                    {option.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default OtherConditions;
