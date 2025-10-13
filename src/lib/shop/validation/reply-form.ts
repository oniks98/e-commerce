import { z } from 'zod';

export const replySchema = z.object({
  name: z.string().min(1, "Ім'я обов'язкове"),
  email: z.email({ message: 'Невірний email' }),
  review: z.string().min(10, 'Відгук повинен містити мінімум 10 символів'),
});

export type ReplyFormValues = z.infer<typeof replySchema>;
