'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import clsx from 'clsx';
import { useCartStore } from '@/store/cart-store';

import CartSkeleton from '@/components/shop/cart/cart-skeleton';
import {
  MinusIcon,
  AddIcon,
  CheckIconSmall,
  DeleteIcon,
  AngleDoubleUpIcon,
  FilterCheckboxActiveIcon,
  FilterCheckboxEmptyIcon,
} from '@/lib/shop/icons';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice } =
    useCartStore();
  const [showAll, setShowAll] = useState(false);
  const [noCall, setNoCall] = useState(false);
  const [mounted, setMounted] = useState(false);

  const params = useParams();
  const locale = params.locale;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <CartSkeleton />;
  }

  const totalAmount = getTotalPrice();
  const totalItems = getTotalItems();
  const deliveryCost = 'За тарифами оператора';

  const visibleItems = showAll ? items : items.slice(0, 2);

  return (
    <section className="rounded-lg bg-white p-4 shadow-lg md:p-[30px]">
      <div className="mb-10 flex items-center gap-[10px]">
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
          <ul className="mb-7 flex flex-col gap-y-7">
            {visibleItems.map((item, i) => (
              <React.Fragment key={item.id}>
                <li className="flex flex-row flex-wrap gap-5 rounded-lg lg:flex-nowrap">
                  {/* Ліва частина: зображення та кількість */}
                  <div className="relative flex w-[120px] flex-shrink-0 flex-col justify-between gap-4">
                    {/* Зображення товару */}
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={120}
                      height={100}
                      className="h-[100px] w-full rounded-lg object-cover"
                    />

                    {/* Кнопки кількості */}
                    <div className="border-grey-light bg-light flex w-full items-center justify-center gap-[15px] rounded-lg border px-5 py-[13px]">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex h-4 w-4 items-center justify-center"
                        aria-label="Зменшити кількість"
                      >
                        <MinusIcon className="text-grey-light h-full w-full" />
                      </button>
                      <span className="text-dark text-xl font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex h-4 w-4 items-center justify-center"
                        aria-label="Збільшити кількість"
                      >
                        <AddIcon className="text-grey-light h-full w-full" />
                      </button>
                    </div>
                  </div>

                  {/* Права частина: інформація про товар */}
                  <div className="flex w-100 gap-5 lg:w-auto">
                    <div className="flex flex-1 flex-col justify-between gap-[5px]">
                      {/* Назва товару */}
                      <h4 className="text-dark text-[19px] leading-[1.26] font-semibold">
                        {item.name}
                      </h4>

                      {/* Код товару */}
                      <p className="text-grey text-[13px] leading-[22px] font-light">
                        Код товару: {item.sku}
                      </p>

                      {/* Статус в наявності */}
                      <div className="flex items-center gap-[5px]">
                        <CheckIconSmall className="text-green h-6 w-6" />
                        <p className="text-dark text-[13px] leading-[22px] font-light">
                          В наявності
                        </p>
                      </div>

                      {/* Ціна */}
                      <div className="flex h-[50px] items-center gap-5">
                        <p className="text-dark text-xl font-semibold">
                          {(item.price * item.quantity).toLocaleString()} грн.
                        </p>
                        {item.oldPrice && (
                          <p className="text-red text-[15px] leading-[22px] font-normal line-through">
                            {(item.oldPrice * item.quantity).toLocaleString()}{' '}
                            грн.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Кнопка видалення */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mb-7 flex h-6 w-6 flex-shrink-0 items-center justify-center"
                      aria-label="Видалити товар"
                    >
                      <DeleteIcon className="text-dark h-full w-full" />
                    </button>
                  </div>
                </li>
                {i < visibleItems.length - 1 && (
                  <li className="bg-light h-1"></li>
                )}
              </React.Fragment>
            ))}
          </ul>

          {items.length > 3 && (
            <div className="relative">
              {!showAll && (
                <div className="pointer-events-none absolute bottom-0 h-20 w-full" />
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

          <div className="border-grey-light border-t-2 pt-5">
            <h4 className="text-dark mb-3 text-2xl font-semibold">Разом:</h4>
            <ul className="flex flex-col gap-y-2 text-base">
              <li className="flex items-end justify-between">
                <p className="text-dark">{totalItems} товари на суму:</p>
                <div className="border-grey-light flex-1 border-b-2 border-dashed" />
                <p className="text-dark">{totalAmount.toLocaleString()} грн.</p>
              </li>
              <li className="flex items-end justify-between">
                <p className="text-dark">Вартість доставки:</p>
                <div className="border-grey-light flex-1 border-b-2 border-dashed" />
                <p className="text-dark">{deliveryCost}</p>
              </li>
              <li className="mt-2 flex items-end justify-between">
                <p className="text-dark">До оплати:</p>
                <div className="border-grey-light flex-1 border-b-2 border-dashed" />
                <p className="text-dark text-2xl font-semibold">
                  {totalAmount.toLocaleString()} грн.
                </p>
              </li>
            </ul>
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
                <FilterCheckboxActiveIcon className="shrink-0" />
              ) : (
                <FilterCheckboxEmptyIcon className="shrink-0" />
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
            <Link href={`/${locale}/terms`} className="underline">
              Угоди користувача
            </Link>
          </p>
        </>
      )}
    </section>
  );
};

export default Cart;
