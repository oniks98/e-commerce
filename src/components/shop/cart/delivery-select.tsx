'use client';

import { useState } from 'react';
import clsx from 'clsx';

import DeliverySelectIcon from '@/lib/shop/icons/delivery-select-icon';
import OnMapIcon from '@/lib/shop/icons/on-map-icon';
import NovapostOfficeIcon from '@/lib/shop/icons/novapost-office-icon';
import PickupIcon from '@/lib/shop/icons/pickup-icon';
import CourierIcon from '@/lib/shop/icons/courier-icon';
import CheckCircleIcon from '@/lib/shop/icons/check-circle-icon';
import LocationIcon from '@/lib/shop/icons/location-icon';
import UkrpostOffice from '@/components/shop/ui/ukrpost-office';

const DeliverySelect = () => {
  const [selected, setSelected] = useState('pickup');

  return (
    <div className="w-full max-w-[680px]">
      <div className="mb-[30px] flex items-center gap-[15px]">
        <div className="bg-yellow flex h-[60px] w-[60px] items-center justify-center rounded-full md:h-[40px] md:w-[40px]">
          <DeliverySelectIcon className="h-[30px] w-[26px] text-white" />
        </div>
        <h3 className="text-dark text-2xl font-semibold md:text-xl">
          Вибір способу доставки
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3">
        <div
          className={clsx(
            'cursor-pointer rounded-lg border-2 p-5 text-center',
            selected === 'pickup' ? 'border-yellow' : 'border-light',
          )}
          onClick={() => setSelected('pickup')}
        >
          <div className="relative mx-auto mb-2.5 flex h-10 w-10 items-center justify-center">
            <PickupIcon className="text-yellow h-full w-full" />
            {selected === 'pickup' && (
              <CheckCircleIcon className="text-yellow absolute top-[-10px] right-[-10px] h-5 w-5" />
            )}
          </div>
          <p className="text-dark text-base">Самовивіз із магазину</p>
          <p className="text-grey-light text-sm">Безкоштовно</p>
        </div>

        <div
          className={clsx(
            'cursor-pointer rounded-lg border-2 p-5 text-center',
            selected === 'novaposhta' ? 'border-yellow' : 'border-light',
          )}
          onClick={() => setSelected('novaposhta')}
        >
          <div className="relative mx-auto mb-2.5 flex h-10 w-10 items-center justify-center">
            <NovapostOfficeIcon className="h-full w-full" />
            {selected === 'novaposhta' && (
              <CheckCircleIcon className="text-yellow absolute top-[-10px] right-[-10px] h-5 w-5" />
            )}
          </div>
          <p className="text-dark text-base">Доставка Нова Пошта</p>
          <p className="text-grey-light text-sm">≈ від 500 грн</p>
        </div>

        <div
          className={clsx(
            'cursor-pointer rounded-lg border-2 p-5 text-center',
            selected === 'courier' ? 'border-yellow' : 'border-light',
          )}
          onClick={() => setSelected('courier')}
        >
          <div className="relative mx-auto mb-2.5 flex h-10 w-10 items-center justify-center">
            <CourierIcon className="text-grey h-full w-full" />
            {selected === 'courier' && (
              <CheckCircleIcon className="text-yellow absolute top-[-10px] right-[-10px] h-5 w-5" />
            )}
          </div>
          <p className="text-dark text-base">Доставка кур&apos;єром</p>
          <p className="text-grey-light text-sm">≈ від 200 грн</p>
        </div>
      </div>

      {selected === 'pickup' && (
        <div className="bg-light mt-5 rounded-lg p-5 md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <LocationIcon className="text-grey-light h-10 w-10 shrink-0" />
            <div>
              <p className="text-dark text-sm">
                Графік роботи: щодня з 9:00 до 18:00
              </p>
              <p className="text-dark text-lg font-semibold">
                м. Київ, пров. Ізяславський 52, пов. 2
              </p>
            </div>
          </div>
          <button className="bg-yellow mt-5 flex items-center justify-center gap-2.5 rounded-lg px-5 py-3 text-white md:mt-0">
            <OnMapIcon className="h-6 w-6" />
            <span>На мапі</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DeliverySelect;
