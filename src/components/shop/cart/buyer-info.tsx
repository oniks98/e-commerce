'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import FilterCheckboxActiveIcon from '@/lib/shop/icons/filter-checkbox-active-icon';
import FilterCheckboxEmptyIcon from '@/lib/shop/icons/filter-checkbox-empty-icon';
import InfoIcon from '@/lib/shop/icons/info-icon';

const formSchema = z
  .object({
    lastName: z.string().min(1, 'Поле не може бути порожнім'),
    firstName: z.string().min(1, 'Поле не може бути порожнім'),
    middleName: z.string().min(1, 'Поле не може бути порожнім'),
    phone: z.string().min(1, 'Поле не може бути порожнім'),
    email: z.string().email('Неправильний формат email'),
    anotherPerson: z.boolean(),
    recipientLastName: z.string().optional(),
    recipientFirstName: z.string().optional(),
    recipientMiddleName: z.string().optional(),
    recipientPhone: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.anotherPerson) {
        return (
          !!data.recipientLastName &&
          !!data.recipientFirstName &&
          !!data.recipientMiddleName &&
          !!data.recipientPhone
        );
      }
      return true;
    },
    {
      message: 'Будь ласка, заповніть інформацію про отримувача',
      path: [
        'recipientLastName',
        'recipientFirstName',
        'recipientMiddleName',
        'recipientPhone',
      ],
    },
  );

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
    <section className="w-full max-w-[680px]">
      <div className="mb-[30px] flex items-center gap-[15px]">
        <div className="bg-yellow flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full">
          <InfoIcon className="h-[30px] w-[30px] text-white" />
        </div>
        <h3 className="text-dark text-2xl font-semibold md:text-xl">
          Інформація про покупця
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-y-[20px] md:grid-cols-2 md:gap-x-[30px] md:gap-y-[30px]"
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
        <div className="flex items-center gap-2.5 md:col-span-2">
          <label className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              {...register('anotherPerson')}
              className="hidden"
            />
            {anotherPerson ? (
              <FilterCheckboxActiveIcon className="h-6 w-6 shrink-0" />
            ) : (
              <FilterCheckboxEmptyIcon className="h-6 w-6 shrink-0" />
            )}

            <span className="text-grey ml-2.5 text-base">
              Отримуватиме замовлення інша людина
            </span>
          </label>
        </div>
      </form>

      {anotherPerson && (
        <div className="mt-[30px] w-full max-w-[680px]">
          <div className="mb-[30px] flex items-center gap-[15px]">
            <div className="bg-yellow flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full">
              <InfoIcon className="h-[30px] w-[30px] text-white" />
            </div>
            <h3 className="text-dark text-2xl font-semibold md:text-xl">
              Отримувач
            </h3>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-y-[20px] md:grid-cols-2 md:gap-x-[30px] md:gap-y-[30px]"
          >
            <div className="flex flex-col">
              <input
                {...register('recipientLastName')}
                placeholder="Прізвище"
                className={clsx(
                  'border-grey-light text-grey placeholder:text-grey rounded-lg border bg-white px-5 py-2.5 text-base',
                  errors.recipientLastName && 'border-red-500',
                )}
              />
              {errors.recipientLastName && (
                <span className="text-red-500">
                  {errors.recipientLastName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <input
                {...register('recipientPhone')}
                placeholder="Контактний телефон"
                className={clsx(
                  'border-grey-light text-grey placeholder:text-grey rounded-lg border bg-white px-5 py-2.5 text-base',
                  errors.recipientPhone && 'border-red-500',
                )}
              />
              {errors.recipientPhone && (
                <span className="text-red-500">
                  {errors.recipientPhone.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <input
                {...register('recipientFirstName')}
                placeholder="Ім’я"
                className={clsx(
                  'border-grey-light text-grey placeholder:text-grey rounded-lg border bg-white px-5 py-2.5 text-base',
                  errors.recipientFirstName && 'border-red-500',
                )}
              />
              {errors.recipientFirstName && (
                <span className="text-red-500">
                  {errors.recipientFirstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <input
                {...register('recipientMiddleName')}
                placeholder="По батькові"
                className={clsx(
                  'border-grey-light text-grey placeholder:text-grey rounded-lg border bg-white px-5 py-2.5 text-base',
                  errors.recipientMiddleName && 'border-red-500',
                )}
              />
              {errors.recipientMiddleName && (
                <span className="text-red-500">
                  {errors.recipientMiddleName.message}
                </span>
              )}
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default BuyerInfo;
