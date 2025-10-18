import * as z from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Ім'я має бути не менше 2 символів" })
    .max(100, { message: "Ім'я не може бути більше 100 символів" }),
  email: z
    .string()
    .min(1, { message: "E-mail є обов'язковим" })
    .email({ message: 'Неправильний формат електронної пошти' }),
  phone: z
    .string()
    .min(1, { message: "Телефон є обов'язковим" })
    .regex(/^[\d\s\+\(\)\-]+$/, {
      message: 'Телефон може містити тільки цифри, пробіли та символи +()-',
    })
    .min(10, { message: 'Телефон має бути не менше 10 символів' })
    .max(20, { message: 'Телефон не може бути більше 20 символів' }),
  comment: z
    .string()
    .max(500, { message: 'Коментар не може бути більше 500 символів' })
    .optional(),
});
