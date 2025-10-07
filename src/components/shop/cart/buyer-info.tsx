'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import FilterCheckboxActiveIcon from '@/lib/shop/icons/filter-checkbox-active-icon';
import FilterCheckboxEmptyIcon from '@/lib/shop/icons/filter-checkbox-empty-icon';

import InfoIcon from '@/lib/shop/icons/info-icon';

const formSchema = z.object({
  lastName: z.string().min(1, 'Поле не може бути порожнім'),
  firstName: z.string().min(1, 'Поле не може бути порожнім'),
  middleName: z.string().min(1, 'Поле не може бути порожнім'),
  phone: z.string().min(1, 'Поле не може бути порожнім'),
  email: z.string().email('Неправильний формат email'),
  anotherPerson: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const BuyerInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      anotherPerson: false,
    },
  });

  const anotherPerson = watch('anotherPerson');

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-[680px]">
      <div className="mb-[30px] flex items-center gap-[15px]">
        <div className="bg-yellow flex h-[60px] w-[60px] items-center justify-center rounded-full md:h-[40px] md:w-[40px]">
          <InfoIcon className="h-[30px] w-[30px] text-white md:h-[20px] md:w-[20px]" />
        </div>
        <h3 className="text-dark text-2xl font-semibold md:text-xl">
          Інформація про покупця
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-y-[30px] md:grid-cols-2 md:gap-x-[30px] md:gap-y-[20px]"
      >
        <div className="flex flex-col">
          <input
            {...register('lastName')}
            placeholder="Прізвище"
            className={clsx(
              'border-grey-light text-grey placeholder:text-grey rounded-lg border bg-white px-5 py-2.5 text-base',
              errors.lastName && 'border-red-500',
            )}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            {...register('firstName')}
            placeholder="Ім’я"
            className={clsx(
              'border-grey-light text-grey placeholder:text-grey rounded-lg border bg-white px-5 py-2.5 text-base',
              errors.firstName && 'border-red-500',
            )}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            {...register('middleName')}
            placeholder="По батькові"
            className={clsx(
              'border-grey-light text-grey placeholder:text-grey rounded-lg border bg-white px-5 py-2.5 text-base',
              errors.middleName && 'border-red-500',
            )}
          />
          {errors.middleName && (
            <span className="text-red-500">{errors.middleName.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            {...register('phone')}
            placeholder="Контактний телефон"
            className={clsx(
              'border-grey-light text-grey placeholder:text-grey rounded-lg border bg-white px-5 py-2.5 text-base',
              errors.phone && 'border-red-500',
            )}
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>
        <div className="flex flex-col md:col-span-2">
          <input
            {...register('email')}
            placeholder="E-mail"
            className={clsx(
              'border-grey-light text-grey placeholder:text-grey rounded-lg border bg-white px-5 py-2.5 text-base',
              errors.email && 'border-red-500',
            )}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex items-center gap-2.5">
          <label className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              {...register('anotherPerson')}
              className="hidden"
            />
            {anotherPerson ? (
              <FilterCheckboxActiveIcon />
            ) : (
              <FilterCheckboxEmptyIcon />
            )}

            <span className="text-grey ml-2.5 text-base">
              Отримуватиме замовлення інша людина
            </span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default BuyerInfo;
