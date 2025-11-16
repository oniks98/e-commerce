import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "E-mail є обов'язковим" })
    .email({ message: 'Невірний формат електронної пошти' }),
  password: z
    .string()
    .min(1, { message: "Пароль є обов'язковим" })
    .min(6, { message: 'Пароль має бути не менше 6 символів' }),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Ім'я є обов'язковим" })
    .min(2, { message: "Ім'я має бути не менше 2 символів" })
    .max(100, { message: "Ім'я не може бути більше 100 символів" }),
  email: z
    .string()
    .min(1, { message: "E-mail є обов'язковим" })
    .email({ message: 'Невірний формат електронної пошти' }),
  password: z
    .string()
    .min(1, { message: "Пароль є обов'язковим" })
    .min(8, { message: 'Пароль має бути не менше 8 символів' }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "E-mail є обов'язковим" })
    .email({ message: 'Невірний формат електронної пошти' }),
});

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Ім'я має бути не менше 2 символів" })
    .max(100, { message: "Ім'я не може бути більше 100 символів" }),
  email: z.string().email({ message: 'Невірний формат електронної пошти' }),
  phone: z
    .string()
    .refine(
      (val) => val === '' || val === undefined || /^\+380\d{9}$/.test(val),
      {
        message: 'Невірний формат номера. Введіть у форматі +380XXXXXXXXX',
      },
    )
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
  avatar_url: z.string().url().optional().or(z.literal('')),
});

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: 'Пароль має бути не менше 6 символів' }),
    newPassword: z
      .string()
      .min(8, { message: 'Новий пароль має бути не менше 8 символів' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
