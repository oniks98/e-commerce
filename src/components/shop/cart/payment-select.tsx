'use client';

import { useState } from 'react';
import clsx from 'clsx';

import { paymentOptions } from '@/lib/shop/constants/payment-select-data';
import PaymentSelectIcon from '@/lib/shop/icons/payment-select-icon';

const PaymentSelect = () => {
  const [selected, setSelected] = useState('cash');

  return (
    <div className="w-full max-w-100">
      <div className="mb-[30px] flex items-center gap-[15px]">
        <div className="bg-yellow flex h-[60px] w-[60px] items-center justify-center rounded-full">
          <PaymentSelectIcon className="h-[27px] w-[30px] text-white" />
        </div>
        <h3 className="text-dark text-2xl font-semibold md:text-xl">
          Вибір способу оплати
        </h3>
      </div>

      <ul className="flex flex-col gap-y-[20px]">
        {paymentOptions.map(({ id, label, icons }) => (
          <li
            key={id}
            className="flex cursor-pointer items-center gap-x-[10px]"
            onClick={() => setSelected(id)}
          >
            <div className="relative h-6 w-6">
              <div className="border-grey-light h-full w-full rounded-full border-2" />
              {selected === id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-yellow h-3 w-3 rounded-full" />
                </div>
              )}
            </div>
            <span className="text-dark text-base font-semibold">{label}</span>
            {icons && (
              <div className="flex items-center gap-x-2">
                {icons.map((Icon, index) => (
                  <Icon key={index} className="h-8 w-12" />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentSelect;
