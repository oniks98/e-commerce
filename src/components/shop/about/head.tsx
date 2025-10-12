import Image from 'next/image';

import { aboutHead } from '@/lib/shop/constants/about/about-data';

const Head = () => {
  return (
    <section className="@container relative flex w-full flex-col lg:h-[454px] lg:flex-row">
      <div className="absolute inset-0 z-0">
        <div className="relative hidden h-full w-full lg:flex lg:justify-end">
          <div className="relative h-full w-full max-w-[450px]">
            <Image
              src="/images/about-head-bg.png"
              alt="about-head-bg"
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
      <div className="bg-gradient-white-to-transparent-vertical absolute inset-0 z-5 lg:hidden"></div>
      <div className="bg-gradient-white-to-transparent absolute inset-0 z-5 hidden lg:block"></div>
      <div className="relative z-10 flex h-full w-full flex-col lg:flex-row lg:items-center">
        <div className="w-full px-4 py-6 text-center lg:max-w-[50cqw] lg:py-0 lg:pr-0 lg:pl-[30px] lg:text-left">
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
      <div className="block w-full px-4 pb-6 lg:hidden">
        <div className="relative mx-auto aspect-[480/524] w-full max-w-[480px]">
          <Image
            src="/images/about-head-bg-mobile.png"
            alt="about-head-bg-mobile"
            fill
            className="rounded-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Head;
