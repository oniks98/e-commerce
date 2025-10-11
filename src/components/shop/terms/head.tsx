import Image from 'next/image';
import { termsData } from '@/lib/shop/constants/terms/terms-data';

const Head = () => {
  return (
    <section className="@container relative h-[524px] w-full lg:h-[454px]">
      <div className="absolute inset-0 z-0">
        <div className="hidden h-full w-full lg:block">
          <Image
            src="/images/terms-head-bg.png"
            alt="terms-head-bg"
            fill
            className="h-full w-full object-contain"
          />
        </div>
        <div className="block h-full w-full lg:hidden">
          <Image
            src="/images/terms-head-bg-mobile.png"
            alt="terms-head-bg-mobile"
            fill
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="bg-gradient-white-to-transparent-vertical absolute inset-0 z-5 lg:hidden"></div>
      <div className="bg-gradient-white-to-transparent absolute inset-0 z-5 hidden lg:block"></div>
      <div className="relative z-10 flex h-full w-full items-center lg:items-end">
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 px-4 text-center lg:top-1/2 lg:left-[50px] lg:max-w-[36.89cqw] lg:translate-x-0 lg:-translate-y-1/2 lg:px-0 lg:text-left">
          <h1 className="mb-[20px] text-[30px] font-semibold lg:mb-[30px] lg:text-[40px]">
            {termsData.head.title}
          </h1>
          <h3 className="mb-[10px] text-[20px] font-semibold lg:mb-[20px] lg:text-[26px]">
            {termsData.head.subtitle}
          </h3>
          <p className="text-base font-normal md:text-[20px] lg:font-semibold">
            {termsData.head.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Head;
