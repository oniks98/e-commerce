'use client';

import clsx from 'clsx';
import Link from 'next/link';
import StarIcon from '@/lib/shop/icons/star-icon';
import AddIcon from '@/lib/shop/icons/add-icon';
import ChatIcon from '@/lib/shop/icons/chat-icon';
import LogoMin from './logo-min';

type CompanyInfoVariant = 'xl-sidebar' | 'md-vertical' | 'mobile';

interface CompanyInfoBlockProps {
  variant: CompanyInfoVariant;
}

const CompanyInfoBlock = ({ variant }: CompanyInfoBlockProps) => {
  const isXlSidebar = variant === 'xl-sidebar';
  const isMdVertical = variant === 'md-vertical';
  const isMobile = variant === 'mobile';

  return (
    <div
      className={clsx(
        isXlSidebar && 'w-[410px] pt-4 pr-[40px]',
        isMdVertical && 'mb-10 text-center',
        isMobile && 'mx-auto px-[35px]',
      )}
    >
      <h2
        className={clsx(
          'text-dark font-semibold',
          isXlSidebar && 'text-left text-4xl',
          isMdVertical && 'mb-[48px] text-4xl',
          isMobile && 'text-center text-3xl',
        )}
      >
        Останні відгуки
      </h2>

      <div
        className={clsx(isXlSidebar && 'mt-[48px]', isMobile && 'mt-[48px]')}
      >
        <div
          className={clsx(
            'flex',
            isMdVertical && 'flex-col items-center',
            isMobile && 'flex-col items-center',
          )}
        >
          <div
            className={clsx(
              'h-[80px] w-[80px] shrink-0 overflow-hidden rounded-full bg-white',
              isMdVertical && 'mb-[20px]',
              isMobile && 'mt-[20px]',
            )}
          >
            <LogoMin />
          </div>
          <div
            className={clsx(
              isXlSidebar && 'ml-[30px]',
              isMdVertical && 'text-center',
              isMobile && 'mt-[20px] text-center',
            )}
          >
            <h3
              className={clsx(
                'text-dark text-xl font-semibold',
                isXlSidebar && 'text-left',
                isMdVertical && 'mb-[20px]',
              )}
            >
              💎 ONYX - для Вас безпека та комфорт
            </h3>
            <div
              className={clsx(
                'flex items-center gap-[10px]',
                isXlSidebar && 'mt-[20px]',
                isMdVertical && 'mb-[22px] justify-center',
                isMobile && 'mt-[20px] justify-center',
              )}
            >
              <span className="text-yellow-dark text-[19px] font-semibold">
                5.0
              </span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} className="text-yellow-dark" />
                ))}
              </div>
            </div>
            <p
              className={clsx(
                'text-grey text-sm font-normal',
                isXlSidebar && 'mt-[22px] text-left',
                isMdVertical && 'mb-[30px]',
                isMobile && 'mt-[22px]',
              )}
            >
              Базовано на відгуках: 269
            </p>
          </div>
        </div>

        <div
          className={clsx(
            'flex items-center',
            isXlSidebar && 'mt-[40px] justify-between',
            isMdVertical &&
              'flex-col items-center gap-5 sm:flex-row sm:justify-center',
            isMobile && 'mt-[30px] flex-col gap-5',
          )}
        >
          <button
            className={clsx(
              'bg-yellow flex items-center justify-center rounded-lg text-white',
              'h-[50px]',
              isXlSidebar && 'w-[210px]',
              isMdVertical && 'w-[210px]',
              isMobile && 'w-full max-w-[345px]',
            )}
          >
            <AddIcon />
            <span className="ml-[15px] text-lg font-semibold">
              Написати відгук
            </span>
          </button>

          <Link
            href="/reviews"
            className={clsx(isMobile && 'w-full max-w-[345px]')}
          >
            <button
              className={clsx(
                'text-grey flex items-center justify-center',
                'h-[50px]',
                isXlSidebar && 'w-[170px]',
                isMdVertical && 'w-[170px]',
                isMobile && 'w-full',
              )}
            >
              <ChatIcon />
              <span className="ml-[15px] text-lg font-semibold">
                Всі відгуки
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoBlock;
