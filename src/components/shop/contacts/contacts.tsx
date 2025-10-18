'use client';

import clsx from 'clsx';

import { contactsData } from '@/lib/shop/constants/contacts/contacts-data';
import SocialLinks from '@/components/shop/ui/social-links';

const Contacts = () => {
  return (
    <section className="mb-[50px] md:mb-[70px]">
      <h2
        className={clsx(
          'text-dark mb-[40px] text-center text-[30px] leading-[1.33] font-semibold',
          'md:mb-[50px] md:text-4xl md:leading-[1.2]',
        )}
      >
        {contactsData.title}
      </h2>
      <div
        className={clsx(
          'flex flex-col gap-[30px]',
          'md:flex-row md:flex-wrap md:justify-center md:gap-[50px]',
        )}
      >
        {contactsData.contacts.map(
          ({ Icon, iconClassName, title, content, showSocial }) => (
            <div
              key={title}
              className={clsx(
                'flex items-start gap-[15px]',
                'md:w-[264px] md:flex-shrink-0',
              )}
            >
              <div className={clsx('flex-shrink-0', iconClassName)}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-[5px]">
                <h3 className="text-grey-light text-[17px] leading-[1.41] font-normal">
                  {title}
                </h3>
                <div className="flex flex-col gap-0">
                  {content.map((item) => (
                    <p
                      key={item}
                      className="text-dark text-[20px] leading-[1.4] font-semibold"
                    >
                      {item}
                    </p>
                  ))}
                </div>
                {showSocial && (
                  <div className="mt-[20px]">
                    <SocialLinks iconSize="sm" />
                  </div>
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default Contacts;
