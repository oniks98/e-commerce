'use client';

import BuyerInfo from '@/components/shop/cart/buyer-info';
import DeliverySelect from '@/components/shop/cart/delivery-select';
import PaymentSelect from '@/components/shop/cart/payment-select';
import Comment from '@/components/shop/cart/comment';
import Cart from '@/components/shop/cart/cart';

const ExecutionContract = () => {
  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="flex flex-col gap-10 lg:w-2/3">
        <BuyerInfo />
        <DeliverySelect />
        <PaymentSelect />
        <Comment />
      </div>
      <div className="lg:w-1/3">
        <Cart />
      </div>
    </div>
  );
};

export default ExecutionContract;
