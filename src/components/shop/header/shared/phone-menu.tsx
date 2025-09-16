'use client';

import { useState } from 'react';
import PhoneIcon from '@/lib/shop/icons/phone-icon';
import ArrowDownIcon from '@/lib/shop/icons/arrow-down-icon';

const PHONES = ['063 338-82-60', '067 636-01-90'];

export function PhoneMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // This component is not used in the final header,
  // but is being corrected as per the user's request.

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer items-center gap-[10px] rounded-md p-2 hover:bg-gray-100"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <PhoneIcon />
        <div>
          <div className="text-grey text-xs font-light">
            9:00-14:00 крім вихідних
          </div>
          <div className="text-dark text-xl font-semibold">063 338-82-60</div>
        </div>
        <div className="p-1">
          <ArrowDownIcon className="text-grey h-[7px] w-[11px]" />
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

      <div className="relative z-20 mt-18 flex min-w-[232px] items-start gap-[10px] rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
        {/* Блок 1: иконка телефона */}
        <div className="flex-shrink-0">
          <PhoneIcon className="h-6 w-6 text-gray-700" />
        </div>

        {/* Блок 2: контент */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-500">
            9:00-14:00 крім вихідних
          </span>
          <div className="text-dark text-xl font-semibold">063 338-82-60</div>
          <div className="text-dark text-xl font-semibold">067 636-01-90</div>
          <button
            onClick={() => {
              alert('Форма зворотного дзвінка');
              setIsOpen(false);
            }}
            className="text-xm w-full text-left font-medium text-orange-400 transition-colors duration-200 hover:text-orange-500"
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
              className="h-4 w-4 text-gray-500"
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
}
