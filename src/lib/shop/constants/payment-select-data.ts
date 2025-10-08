import MonoBankLogo from '@/lib/shop/icons/mono-bank-logo';
import PrivatBankCreditLogo from '@/lib/shop/icons/privat-bank-credit-logo';
import PrivatPayLogo from '@/lib/shop/icons/privat-pay-logo';
import MasterCardLogo from '@/lib/shop/icons/master-card-logo';
import VisaCardLogo from '@/lib/shop/icons/visa-card-logo';

export const paymentOptions = [
  {
    id: 'cash',
    label: 'Готівкою при отриманні (Післясплата)',
  },
  {
    id: 'card',
    label: 'Оплата карткою на сайті',
    icons: [MasterCardLogo, VisaCardLogo],
  },
  {
    id: 'payment-to-account',
    label: 'Оплата на рахунок',
  },
];
