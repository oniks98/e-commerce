'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { deliveryOptions } from '@/lib/shop/constants/cart/delivery-select-data';
import {
  DeliverySelectIcon,
  OnMapIcon,
  CheckCircleIcon,
  LocationIcon,
} from '@/lib/shop/icons';

const DeliverySelect = () => {
  const [selected, setSelected] = useState('pickup');

  return (
    <section className="w-full max-w-[680px]">
      <div className="mb-[30px] flex items-center gap-[15px]">
        <div className="bg-sky flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full">
          <DeliverySelectIcon className="h-full w-full text-white" />
        </div>
        <h3 className="text-dark text-2xl font-semibold md:text-xl">
          Вибір способу доставки
        </h3>
      </div>

      <ul className="mb-5 grid grid-cols-1 gap-[20px] md:grid-cols-3">
        {deliveryOptions.map(({ id, label, icon: Icon, iconClassName }) => (
          <li
            key={id}
            className={clsx(
              'relative cursor-pointer rounded-lg border-2 p-5 text-center',
              selected === id ? 'border-sky' : 'border-light',
            )}
            onClick={() => setSelected(id)}
          >
            <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center">
              <Icon className={iconClassName} />
              {selected === id && (
                <CheckCircleIcon className="text-sky absolute top-[10px] right-[10px] h-8 w-8" />
              )}
            </div>
            <p className="text-dark text-base">{label}</p>
          </li>
        ))}
      </ul>

      {selected === 'pickup' && (
        <div className="bg-light rounded-lg p-5 md:flex md:flex-wrap md:items-center md:justify-between md:gap-5">
          <div className="flex items-center gap-5">
            <LocationIcon className="text-grey-light h-10 w-10 shrink-0" />
            <div>
              <p className="text-dark text-sm">
                Графік роботи: щодня з 10:00 до 14:00 крім вихідних
              </p>
              <address className="text-dark text-lg font-semibold not-italic">
                м. Дніпро, вул. Чапленко 4/2
              </address>
            </div>
          </div>
          <a
            href="https://maps.app.goo.gl/boz9UG9UF8cAVkr66"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky mt-5 flex items-center justify-center gap-2.5 rounded-lg px-5 py-3 text-white md:mt-0"
          >
            <OnMapIcon className="h-6 w-6" />
            <span>На мапі</span>
          </a>
        </div>
      )}
    </section>
  );
};

export default DeliverySelect;
