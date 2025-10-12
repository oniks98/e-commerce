import { termsData } from '@/lib/shop/constants/terms/terms-data';
import {
  TerminalPaymentIcon,
  PrivatBankPaymentIcon,
  CashlessPaymentIcon,
  CashOnDeliveryPaymentIcon,
} from '@/lib/shop/icons';

const icons: { [key: string]: React.ComponentType<any> } = {
  terminalPayment: TerminalPaymentIcon,
  privatBankPayment: PrivatBankPaymentIcon,
  cashlessPayment: CashlessPaymentIcon,
  cashOnDeliveryPayment: CashOnDeliveryPaymentIcon,
};

const PaymentMethods = () => {
  return (
    <section className="py-10">
      <h2 className="mb-9 text-center text-4xl font-semibold">
        {termsData.paymentCity.title}
      </h2>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {termsData.paymentCity.options.map((option, index) => {
          const Icon = icons[option.icon];
          return (
            <li key={index} className="flex flex-col items-center text-center">
              <div className="mb-5 h-25 w-25">
                {Icon && <Icon className={option.className} />}
              </div>
              <h3 className="mb-5 text-xl font-semibold">{option.title}</h3>
              <p className="">{option.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PaymentMethods;
