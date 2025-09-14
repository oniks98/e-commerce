'use client';

import { useState } from 'react';
import ArrowDownIcon from '@/lib/shop/icons/ArrowDownIcon';

const LANGUAGES = [
  { code: 'UA', label: 'UA' },
  { code: 'EN', label: 'EN' },
];

export function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState('UA');
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 text-base font-normal text-gray-700 transition-colors duration-200 hover:text-orange-500"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="font-semibold text-orange-500">
          {selectedLanguage}
        </span>
        <ArrowDownIcon className="h-[7px] w-[11px]" />
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
      <div className="relative z-20 mt-14 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
        <div role="listbox">
          {LANGUAGES.map((language, index) => (
            <button
              key={language.code}
              onClick={() => {
                setSelectedLanguage(language.code);
                setIsOpen(false);
              }}
              className={`block w-full px-[7px] py-3 text-left text-base transition-colors duration-200 ${
                language.code === selectedLanguage
                  ? 'font-semibold text-orange-500'
                  : 'text-gray-700 hover:bg-gray-50'
              } ${index < LANGUAGES.length - 1 ? 'border-b border-gray-100' : ''}`}
              role="option"
              aria-selected={language.code === selectedLanguage}
            >
              {language.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
