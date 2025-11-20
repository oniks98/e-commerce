import { setRequestLocale } from 'next-intl/server';

import Contacts from '@/components/shop/contacts/contacts';
import Form from '@/components/shop/contacts/form';
import Map from '@/components/shop/contacts/map';
import Breadcrumbs from '@/components/shop/ui/breadcrumbs';

import { contactsPageBreadcrumbs } from '@/lib/shop/constants/contacts/contacts-data';

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-light">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-38">
        <Breadcrumbs items={contactsPageBreadcrumbs} className="mb-[30px]" />
        <Contacts />
        <Map />
        <Form />
      </div>
    </div>
  );
}
