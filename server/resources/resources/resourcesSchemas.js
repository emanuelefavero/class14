import { z } from 'zod';

const isHttpUrl = (value) => {
  try {
    const { protocol } = new URL(value);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
};

export const createResourceSchema = z.strictObject({
  title: z.string().trim().min(1).max(150),
  url: z.string().trim().min(1).max(255).refine(isHttpUrl),
  project_ids: z
    .array(z.number().int().positive())
    .min(1)
    .refine((ids) => new Set(ids).size === ids.length),
});
