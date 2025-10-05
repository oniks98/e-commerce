'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@/lib/shop/icons';

const LANGUAGES = [
  { code: 'UA', label: 'UA' },
  { code: 'EN', label: 'EN' },
];

const LanguageSwitcher = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('UA');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Триггер остаётся в DOM и занимает место, но скрывается при открытом меню */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={clsx(
          'flex items-center gap-1 text-base font-normal transition-colors duration-200 hover:text-orange-500',
          // сохраняет место в потоке, но скрывает визуально и блокирует клики
          isOpen ? 'pointer-events-none invisible' : 'visible',
        )}
      >
        <span className="font-semibold text-orange-500">
          {selectedLanguage}
        </span>
        <ChevronDownIcon className="h-[7px] w-[11px]" />
      </button>

      {isOpen && (
        <>
          {/* фон для закрытия по клику вне меню */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Меню рендерится абсолютно поверх триггера (т.е. "на месте") */}
          <div className="border-grey-light absolute top-0 left-0 z-60 w-full overflow-hidden rounded-lg border bg-white shadow-lg">
            <div role="listbox" aria-label="Select language">
              {LANGUAGES.map((language, index) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => {
                    setSelectedLanguage(language.code);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={language.code === selectedLanguage}
                  className={clsx(
                    'block w-full px-[7px] py-3 text-left text-base transition-colors duration-200',
                    language.code === selectedLanguage
                      ? 'text-yellow-dark font-semibold'
                      : 'text-dark',
                    index < LANGUAGES.length - 1 && 'border-b border-gray-100',
                  )}
                >
                  {language.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default LanguageSwitcher;
