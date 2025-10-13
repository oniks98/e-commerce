import { z } from 'zod';

export const reviewSchema = z.object({
  name: z.string().min(1, "Ім'я обов'язкове"),
  email: z.email({ message: 'Невірний email' }),
  review: z.string().min(10, 'Відгук повинен містити мінімум 10 символів'),
  rating: z.number().min(1).max(5),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
