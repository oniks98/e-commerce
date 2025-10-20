import DesktopMainHeader from '@/components/shop/header/desktop/desktop-main-header';
import DesktopTopBar from '@/components/shop/header/desktop/desktop-top-bar';

import { CategoryTreeItem } from '@/lib/shop/actions/category';

interface DesktopHeaderProps {
  locale: string;
  catalogData: CategoryTreeItem[];
}

const DesktopHeader = ({ locale, catalogData }: DesktopHeaderProps) => {
  return (
    <>
      <DesktopTopBar />
      <DesktopMainHeader locale={locale} catalogData={catalogData} />
    </>
  );
};

export default DesktopHeader;
