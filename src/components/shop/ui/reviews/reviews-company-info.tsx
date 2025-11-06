import Link from 'next/link';

import Logo from '@/components/shop/ui/logo';

import { StarIcon, AddIcon, ChatIcon } from '@/lib/shop/icons';

interface ReviewsCompanyInfoProps {
  variant?: 'xl-sidebar' | 'md-vertical' | 'mobile';
}

const ReviewsCompanyInfo = ({ variant }: ReviewsCompanyInfoProps) => {
  return (
    <section className="mx-auto px-[35px] md:mx-0 md:mb-10 md:px-0 md:text-center xl:w-[410px] xl:p-0 xl:pt-4 xl:pr-[40px] xl:text-left">
      <div className="mb-5 flex flex-col items-center xl:flex-row">
        <div className="h-[80px] w-[80px] shrink-0 overflow-hidden rounded-full bg-white md:mb-[20px] xl:self-start">
          <Logo />
        </div>
        <div className="mt-[20px] text-center md:mt-0 xl:ml-[30px] xl:text-left">
          <h3 className="text-dark text-xl font-semibold md:mb-[20px] xl:mb-0 xl:text-left">
             ONYX - для Вас безпека та комфорт
          </h3>
          <div className="mt-[20px] flex items-center justify-center gap-[10px] md:mb-[22px] xl:m-0 xl:mt-[20px] xl:justify-start">
            <span className="text-sky-dark text-[19px] font-semibold">5.0</span>
            <div className="flex" role="img" aria-label="5 зірок з 5">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} className="text-sky-dark" />
              ))}
            </div>
          </div>
          <p className="text-grey mt-[22px] text-sm font-normal md:mb-[30px] xl:m-0 xl:mt-[22px] xl:text-left">
            Базовано на відгуках: 269
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCompanyInfo;
