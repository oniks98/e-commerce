'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useCartStore } from '@/store/cart-store';

import MinusIcon from '@/lib/shop/icons/minus-icon';
import PlusIcon from '@/lib/shop/icons/plus-icon';
import CheckIconSmall from '@/lib/shop/icons/check-icon-small';
import DeleteIcon from '@/lib/shop/icons/delete-icon';
import PromoIcon from '@/lib/shop/icons/promo-icon';
import AngleDoubleUpIcon from '@/lib/shop/icons/angle-double-up-icon';
import FilterCheckboxActiveIcon from '@/lib/shop/icons/filter-checkbox-active-icon';
import FilterCheckboxEmptyIcon from '@/lib/shop/icons/filter-checkbox-empty-icon';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice } =
    useCartStore();
  const [showAll, setShowAll] = useState(false);
  const [noCall, setNoCall] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-[520px] rounded-lg bg-white p-[30px] shadow-lg">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-dark text-2xl font-semibold">Ваш кошик</h3>
          <p className="text-yellow text-2xl font-semibold">0</p>
        </div>
      </div>
    );
  }

  const totalAmount = getTotalPrice();
  const totalItems = getTotalItems();
  const deliveryCost = 'За тарифами оператора';

  const visibleItems = showAll ? items : items.slice(0, 2);

  return (
    <div className="w-full max-w-[520px] rounded-lg bg-white p-[30px] shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-dark text-2xl font-semibold">Ваш кошик</h3>
        <p className="text-yellow text-2xl font-semibold">{totalItems}</p>
      </div>

      {items.length === 0 ? (
        <div className="text-grey py-8 text-center">
          <p className="mb-2 text-lg">Ваш кошик порожній</p>
          <p className="text-sm">Додайте товари для оформлення замовлення</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-y-5">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="border-grey-light flex gap-x-5 border-b pb-5"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={100}
                  className="rounded-lg object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <p className="text-dark text-lg font-semibold">
                        {item.name}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Видалити товар"
                      >
                        <DeleteIcon className="h-6 w-6 cursor-pointer" />
                      </button>
                    </div>
                    <div className="mt-1 flex items-center gap-x-1">
                      <CheckIconSmall className="h-5 w-5 text-green-500" />
                      <p className="text-dark text-sm">В наявності</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="border-grey-light flex h-8 w-8 items-center justify-center rounded-full border"
                        aria-label="Зменшити кількість"
                      >
                        <MinusIcon className="text-grey" />
                      </button>
                      <span className="text-dark font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="border-grey-light flex h-8 w-8 items-center justify-center rounded-full border"
                        aria-label="Збільшити кількість"
                      >
                        <PlusIcon className="text-grey" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-dark text-xl font-semibold">
                        {(item.price * item.quantity).toLocaleString()} грн.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {items.length > 2 && (
            <div className="relative">
              {!showAll && (
                <div className="absolute bottom-0 h-20 w-full bg-gradient-to-t from-white" />
              )}
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-yellow mx-auto mt-5 flex items-center gap-x-2 py-2 font-semibold"
              >
                <span>{showAll ? 'Згорнути' : 'Показати всі'}</span>
                <AngleDoubleUpIcon
                  className={clsx('h-4 w-3', { 'rotate-180': !showAll })}
                />
              </button>
            </div>
          )}

          <div className="border-grey-light my-5 border-t-2 pt-5">
            <div className="flex items-center gap-x-2">
              <PromoIcon className="text-yellow h-8 w-8" />
              <p className="text-dark text-lg font-semibold">Є промокод?</p>
            </div>
            <div className="mt-2 flex gap-x-2">
              <input
                type="text"
                placeholder="Введіть код"
                className="border-grey-light flex-1 rounded-lg border p-3"
              />
              <button className="bg-yellow rounded-lg px-6 py-3 font-semibold text-white">
                ОК
              </button>
            </div>
          </div>

          <div className="border-grey-light border-t-2 pt-5">
            <h4 className="text-dark mb-3 text-2xl font-semibold">Разом:</h4>
            <div className="flex flex-col gap-y-2 text-base">
              <div className="flex items-end justify-between">
                <p className="text-dark">{totalItems} товари на суму:</p>
                <div className="border-grey-light flex-1 border-b-2 border-dashed" />
                <p className="text-dark">{totalAmount.toLocaleString()} грн.</p>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-dark">Вартість доставки:</p>
                <div className="border-grey-light flex-1 border-b-2 border-dashed" />
                <p className="text-dark">{deliveryCost}</p>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <p className="text-dark">До оплати:</p>
                <div className="border-grey-light flex-1 border-b-2 border-dashed" />
                <p className="text-dark text-2xl font-semibold">
                  {totalAmount.toLocaleString()} грн.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-x-2">
            <label className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={noCall}
                onChange={() => setNoCall(!noCall)}
                className="hidden"
              />
              {noCall ? (
                <FilterCheckboxActiveIcon />
              ) : (
                <FilterCheckboxEmptyIcon />
              )}

              <span className="text-dark ml-2.5 text-base">
                Не передзвонюйте мені для підтвердження замовлення
              </span>
            </label>
          </div>

          <button className="bg-yellow mt-5 w-full rounded-lg py-4 text-center font-semibold text-white">
            ОФОРМИТИ ЗАМОВЛЕННЯ
          </button>

          <p className="text-grey mt-3 text-center text-sm">
            Підтверджуючи замовлення, я приймаю умови{' '}
            <a href="#" className="underline">
              Угоди користувача
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default Cart;
