'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { seoText } from '@/lib/shop/constants/seo-text-data';
import { ArrowDownIcon, CheckIcon } from '@/lib/shop/icons';
import Shadow from '@/components/ui/shadow';

const SeoText = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relativeflex mb-8 justify-items-end py-8">
      <div className="max-w-240">
        <h2 className="text-grey mb-6 text-center text-3xl font-semibold">
          {seoText.title}
        </h2>
        <div
          className={`relative overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-full' : 'max-h-96'}`}
        >
          <div>
            {seoText.paragraphs.map((p, i) => (
              <p key={i} className="text-grey mb-4">
                {p}
              </p>
            ))}
            <h3 className="text-grey mt-6 mb-4 text-xl font-semibold">
              {seoText.list.title}
            </h3>
            <ul>
              {seoText.list.items.map((item, i) => (
                <li key={i} className="mb-2 flex items-center">
                  <CheckIcon className="mr-2 h-6 w-6 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-grey mt-4">{seoText.additionalText}</p>
          </div>
          {!isExpanded && (
            <div className="from-light absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t to-transparent"></div>
          )}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-lg text-yellow-dark"
          >
            <div
              className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            >
              <ArrowDownIcon />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeoText;
