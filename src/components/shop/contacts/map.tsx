import Image from 'next/image';

import clsx from 'clsx';

import { contactsData } from '@/lib/shop/constants/contacts/contacts-data';

const Map = () => {
  const { title, link } = contactsData.map;
  const { Icon, text, href } = link;

  return (
    <section className="mb-[50px] md:mb-[70px]">
      <h2
        className={clsx(
          'text-dark mb-[30px] text-center text-[26px] leading-[1.3] font-semibold',
          'md:mb-[40px] md:text-4xl md:leading-[1.33]',
        )}
      >
        {title}
      </h2>

      {/* Map Image */}
      <div className="mb-10 w-full max-w-[1290px]">
        <Image
          src="/images/map.png"
          alt="Карта розташування"
          width={1290}
          height={650}
          className="rounded-lg object-cover"
          sizes="(max-width: 1290px) 100vw, 1290px"
        />
      </div>

      {/* Directions */}
      <div className="flex justify-center">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            'bg-sky flex h-[50px] items-center justify-center gap-[15px] rounded-lg px-5 py-2',
            'text-[19px] leading-[1.26] font-semibold text-white',
            'hover:bg-sky-dark transition-colors',
            'w-[270px]',
          )}
        >
          <Icon width={24} height={24} />
          {text}
        </a>
      </div>
    </section>
  );
};

export default Map;
