import Image from 'next/image';

import { aboutHead } from '@/lib/shop/constants/about/about-data';

const Head = () => {
  return (
    <section className="relative h-[524px] w-full lg:h-[454px]">
      <div className="absolute inset-0 z-0">
        <div className="hidden h-full w-full lg:block">
          <Image
            src="/images/about-head-bg.png"
            alt="about-head-bg"
            fill
            className="h-full w-full object-contain"
          />
        </div>
        <div className="block h-full w-full lg:hidden">
          <Image
            src="/images/about-head-bg-mobile.png"
            alt="about-head-bg-mobile"
            fill
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="bg-gradient-white-to-transparent absolute inset-0 z-5"></div>
      <div className="relative z-10 flex h-full w-full items-center lg:items-end">
        <div className="absolute left-1/2 w-full max-w-[450px] -translate-x-1/2 -translate-y-1/2 text-center lg:top-1/2 lg:left-[50px] lg:translate-x-0 lg:text-left">
          <h1 className="mb-[20px] text-[30px] font-semibold lg:mb-[30px] lg:text-[40px]">
            {aboutHead.title}
          </h1>
          <h3 className="mb-[10px] text-[20px] font-semibold lg:mb-[20px] lg:text-[26px]">
            {aboutHead.subtitle}
          </h3>
          <p className="text-base font-normal md:text-[20px] lg:font-semibold">
            {aboutHead.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Head;
