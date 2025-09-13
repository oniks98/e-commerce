// src/components/shop/ui/phone-menu.tsx
'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './dropdown-menu';
import { Phone } from 'lucide-react';

const PHONES = [{ number: '063 338-82-60' }, { number: '067 636-01-90' }];

export function PhoneMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded p-2 hover:bg-gray-100">
        <Phone className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[12rem] rounded-md border border-gray-200 bg-white p-2 text-black shadow-lg"
        sideOffset={6}
      >
        <div className="px-2 py-1 text-xs text-gray-500">
          Щодня з 9:00 до 18:00
        </div>
        {PHONES.map((p) => (
          <DropdownMenuItem
            key={p.number}
            className="cursor-pointer rounded px-2 py-1.5 text-sm font-semibold hover:bg-gray-100"
            onSelect={() =>
              (window.location.href = `tel:${p.number.replace(/\s|-/g, '')}`)
            }
          >
            {p.number}
          </DropdownMenuItem>
        ))}
        <div className="my-1 border-t" />
        <DropdownMenuItem
          onSelect={() => alert('Форма зворотного дзвінка')}
          className="cursor-pointer rounded px-2 py-1.5 text-sm font-medium text-orange-500 hover:bg-orange-50"
        >
          Передзвоніть мені
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
