import { z } from 'zod';

const hasNoControlCharacters = (value) => !/[\u0000-\u001f\u007f]/.test(value);

const queryString = (maximum) =>
  z.string().refine(hasNoControlCharacters).trim().max(maximum);

/**
 * Validates optional search/topic filters for catalog lists.
 * @example
 * // GET /api/students?q=emanuele&topic=React
 * // req.query: { q: 'emanuele', topic: 'React' }
 */
export const catalogQuerySchema = z.strictObject({
  q: queryString(150).optional(),
  topic: queryString(255)
    .refine((value) => !value.includes(',')) // single topic, no commas allowed
    .optional(),
});
