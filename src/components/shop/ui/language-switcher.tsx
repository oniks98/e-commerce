// src/components/shop/ui/language-switcher.tsx
'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './dropdown-menu';

const LANGUAGES = [
  { code: 'UA', label: 'Українська' },
  { code: 'EN', label: 'English' },
];

export function LanguageSwitcher() {
  const [lang, setLang] = useState('UA');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded px-2 py-1 text-sm font-medium hover:bg-gray-100">
        {lang}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[6rem] rounded-md border border-gray-200 bg-white p-1 text-black shadow-lg"
        sideOffset={6}
      >
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => setLang(l.code)}
            className="cursor-pointer rounded px-3 py-1.5 text-sm hover:bg-gray-100"
          >
            {l.code}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
