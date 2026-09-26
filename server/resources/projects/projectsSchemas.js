import { z } from 'zod';

// Check that the string has no control characters (ASCII 0-31 and 127)
const hasNoControlCharacters = (value) => !/[\u0000-\u001f\u007f]/.test(value);

const queryString = (maximum) =>
  z.string().refine(hasNoControlCharacters).trim().max(maximum);

export const projectQuerySchema = z.strictObject({
  q: queryString(150).optional(),
  topic: queryString(255)
    .refine((value) => !value.includes(','))
    .optional(),
});

export const projectParamsSchema = z.strictObject({
  slug: z
    .string()
    .min(1)
    .max(150)
    .regex(/^[a-zA-Z0-9-]+$/),
});

export const projectDetailQuerySchema = z.strictObject({});
