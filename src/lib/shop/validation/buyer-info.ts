import { z } from 'zod';

export const buyerInfoSchema = z
  .object({
    lastName: z.string().min(1, 'Поле не може бути порожнім'),
    firstName: z.string().min(1, 'Поле не може бути порожнім'),
    middleName: z.string().min(1, 'Поле не може бути порожнім'),
    phone: z.string().min(1, 'Поле не може бути порожнім'),
    email: z.email({ message: 'Невірний email' }),
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

export type BuyerInfoFormValues = z.infer<typeof buyerInfoSchema>;
