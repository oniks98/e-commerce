import { termsData } from '@/lib/shop/constants/terms/terms-data';
import {
  UkrainePaymentIcon,
  CreditPaymentIcon,
  PrepaymentIcon,
} from '@/lib/shop/icons';

const icons: { [key: string]: React.ComponentType<any> } = {
  ukrainePayment: UkrainePaymentIcon,
  creditPayment: CreditPaymentIcon,
  prepayment: PrepaymentIcon,
};

const PaymentCountry = () => {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px]">
        <h2 className="mb-6 text-center text-4xl font-semibold">
          {termsData.paymentCountry.title}
        </h2>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {termsData.paymentCountry.options.map((option, index) => {
            const Icon = icons[option.icon];
            return (
              <li
                key={index}
                className="flex flex-col items-center text-center"
              >
                {Icon && <Icon />}
                <h3 className="mt-4 text-xl font-semibold">{option.title}</h3>
                <p className="mt-2">{option.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default PaymentCountry;
