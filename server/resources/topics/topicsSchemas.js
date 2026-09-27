import { z } from 'zod';

export const topicParamsSchema = z.object({
  name: z
    .string()
    .refine((value) => !/[\u0000-\u001f\u007f,]/.test(value))
    .trim()
    .min(1)
    .max(255),
});
