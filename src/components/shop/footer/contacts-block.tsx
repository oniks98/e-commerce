import Link from 'next/link';
import { footerData } from '@/lib/shop/constants/footer-data';
import { PhoneIcon, AddressIcon, CalendarIcon } from '@/lib/shop/icons';

const ContactsBlock = () => {
  const { contacts } = footerData;

  return (
    <div className="flex flex-col items-center gap-y-6 md:items-start">
      <div className="flex flex-col items-center gap-2 text-center md:flex-row xl:gap-x-4 xl:text-left">
        <PhoneIcon className="hidden h-6 w-6 flex-shrink-0 md:block" />
        <div>
          <ul className="flex flex-col gap-y-2">
            {contacts.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s|-/g, '')}`}>{phone}</a>
              </li>
            ))}
          </ul>
          <a href="#" className="text-yellow mt-2 inline-block underline">
            {contacts.callbackText}
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-2 text-center md:flex-row md:gap-x-4 md:text-left">
        <AddressIcon className="h-6 w-6 flex-shrink-0" />
        <Link
          href="https://maps.app.goo.gl/eWLotVL1DGVTakV56"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow underline transition-colors duration-300"
        >
          {contacts.address}
        </Link>
      </div>
      <div className="flex max-w-75 flex-col items-center gap-y-2 text-center md:flex-row md:gap-x-4 md:text-left">
        <CalendarIcon className="h-6 w-6 flex-shrink-0" />
        <p>{contacts.workingHours}</p>
      </div>
    </div>
  );
};

export default ContactsBlock;
