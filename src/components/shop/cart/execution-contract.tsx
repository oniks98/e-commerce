'use client';

import BuyerInfo from '@/components/shop/cart/buyer-info';
import DeliverySelect from '@/components/shop/cart/delivery-select';
import PaymentSelect from '@/components/shop/cart/payment-select';
import Comment from '@/components/shop/cart/comment';
import Cart from '@/components/shop/cart/cart';

const ExecutionContract = () => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-8 lg:flex-row">
      <div className="flex w-full flex-col gap-8 rounded-lg bg-white p-4 shadow-lg md:p-[30px]">
        <BuyerInfo />
        <div className="bg-light h-[5px]"></div>
        <DeliverySelect />
        <div className="bg-light h-[5px]"></div>
        <PaymentSelect />
        <div className="bg-light h-[5px]"></div>
        <Comment />
      </div>
      <div>
        <Cart />
      </div>
    </div>
  );
};

export default ExecutionContract;
