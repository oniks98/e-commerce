import { footerData } from '@/lib/shop/constants/footer-data';

const Copyright = () => {
  return (
    <div className="border-grey-light border-t py-6">
      <div className="mx-auto px-4">
        <p className="text-copyright-text text-center text-sm">
          {footerData.copyright}
        </p>
      </div>
    </div>
  );
};

export default Copyright;
