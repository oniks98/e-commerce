'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { contactsData } from '@/lib/shop/constants/contacts/contacts-data';
import { getPlaceholder } from '@/lib/shop/media/cloudinary';
import { contactFormSchema } from '@/lib/shop/validation/form';

const ContactForm = () => {
  const { title, description, subtitle, ...placeholders } = contactsData.form;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      comment: '',
    },
  });

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    console.log('Form submitted:', values);
    // TODO: Implement actual form submission
    reset();
  };

  const backgroundImageUrl = '/images/logo.png';

  const inputStyles = clsx(
    'w-full rounded-lg border border-[#D1D5D5] bg-white px-5 py-2.5',
    'text-[16px] leading-[1.875] text-grey placeholder:text-grey',
    'transition-colors focus:border-sky focus:outline-none',
  );

  const textareaStyles = clsx(
    'h-[150px] w-full resize-none rounded-lg border border-[#D1D5D5] bg-white px-5 py-2.5',
    'text-[16px] leading-[1.875] text-grey placeholder:text-grey',
    'transition-colors focus:border-sky focus:outline-none',
  );

  const submitButtonStyles = clsx(
    'flex h-[50px] w-full items-center justify-center gap-[15px] rounded-lg bg-sky px-5 py-2',
    'text-[19px] font-semibold leading-[1.26] text-white',
    'transition-colors hover:bg-sky-dark',
    'md:w-[240px]',
  );

  return (
    <section className="relative mb-[50px] overflow-hidden rounded-lg md:mb-[80px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImageUrl}')`,
          boxShadow: '-3px 4px 15px 0px rgba(0, 0, 0, 0.06)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-[30px] py-[40px] md:px-[50px] md:py-[50px]">
        <div
          className={clsx(
            'flex flex-col gap-[40px]',
            'md:flex-row lg:gap-[220px]',
          )}
        >
          {/* Text Block */}
          <div className="flex flex-col gap-[30px] md:w-[470px]">
            <h2 className="text-dark text-[30px] leading-[1.2] font-semibold md:text-4xl">
              {title}
            </h2>
            <p className="text-dark text-[20px] leading-[1.3] font-semibold md:text-[26px]">
              {description}
            </p>
            <p className="text-sky text-[26px] leading-[1.33] font-semibold md:text-[30px]">
              {subtitle}
            </p>
          </div>

          {/* Form Block */}
          <div className="w-full md:w-[410px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[20px]"
            >
              {/* Name */}
              <div>
                <input
                  placeholder={placeholders.namePlaceholder}
                  {...register('name')}
                  className={inputStyles}
                  aria-label="Ваше ім'я прізвище"
                />
                {errors.name && (
                  <p className="text-red mt-1 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder={placeholders.emailPlaceholder}
                  {...register('email')}
                  className={inputStyles}
                  aria-label="E-mail"
                />
                {errors.email && (
                  <p className="text-red mt-1 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  placeholder={placeholders.phonePlaceholder}
                  {...register('phone')}
                  className={inputStyles}
                  aria-label="Контактний телефон"
                />
                {errors.phone && (
                  <p className="text-red mt-1 text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Comment */}
              <div>
                <textarea
                  placeholder={placeholders.commentPlaceholder}
                  {...register('comment')}
                  className={textareaStyles}
                  aria-label="Ваш коментар або питання"
                />
                {errors.comment && (
                  <p className="text-red mt-1 text-sm">
                    {errors.comment.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className={submitButtonStyles}>
                {placeholders.submitButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
