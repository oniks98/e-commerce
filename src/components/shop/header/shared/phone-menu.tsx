'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { PhoneIcon, ChevronDownIcon } from '@/lib/shop/icons';
import { PHONES } from '@/lib/shop/constants/phone-data';

const PhoneMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // This component is not used in the final header,
  // but is being corrected as per the user's request.

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer items-center gap-[12px] rounded-md p-2"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <div className="bg-light relative h-[50px] w-[50px] flex-shrink-0 rounded-full">
          <PhoneIcon className="text-grey absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div>
          <div className="text-dark text-xl font-semibold">{PHONES[0]}</div>
        </div>
        <div className="p-1">
          <ChevronDownIcon className="text-grey h-[7px] w-[11px]" />
        </div>
      </button>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 z-10"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div className="border-grey-light relative z-20 mt-18 flex min-w-[232px] items-start gap-[10px] rounded-lg border bg-white p-2 shadow-lg">
        {/* Блок 1: иконка телефона */}
        <div className="bg-light relative h-[50px] w-[50px] flex-shrink-0 rounded-full">
          <PhoneIcon className="text-grey absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Блок 2: контент */}
        <div className="flex flex-col gap-2">
          <span className="text-grey text-xs">9:00-14:00 крім вихідних</span>
          <ul className="flex flex-col gap-2">
            {PHONES.map((phone, index) => (
              <li key={index} className="text-dark text-xl font-semibold">
                <a href={`tel:${phone.replace(/\s|-/g, '')}`}>{phone}</a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              alert('Форма зворотного дзвінка');
              setIsOpen(false);
            }}
            className={clsx(
              'text-xm w-full text-left font-medium text-orange-400',
              'transition-colors duration-200 hover:text-orange-500',
            )}
          >
            Передзвоніть мені
          </button>
        </div>

        {/* Блок 3: кнопка закрытия */}
        <div className="flex-shrink-0">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded transition-colors duration-200 hover:bg-gray-100"
          >
            <svg
              className="text-grey h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
export default PhoneMenu;
