import { z } from 'zod';

export const statsSchema = z.object({
  students_count: z.number().int().nonnegative(),
  projects_count: z.number().int().nonnegative(),
  repositories_count: z.number().int().nonnegative(),
  cheatsheets_count: z.number().int().nonnegative(),
  resources_count: z.number().int().nonnegative(),
});
