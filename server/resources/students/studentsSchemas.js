import { z } from 'zod';

export const studentParamsSchema = z.strictObject({
  github_username: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z0-9-]+$/), // alphanumeric characters and hyphens only
});
