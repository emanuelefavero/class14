import { z } from 'zod';

const positiveInteger = (maximum) =>
  z.coerce.number().int().min(1).max(maximum);

const envSchema = z.object({
  PORT: positiveInteger(65535).default(3000),
  DB_HOST: z.string().trim().min(1).default('localhost'),
  DB_PORT: positiveInteger(65535).default(3306),
  DB_USER: z.string().trim().min(1),
  DB_PASSWORD: z.string().default(''),
  DB_NAME: z.string().trim().min(1).default('class14'),
  DB_CONNECTION_LIMIT: positiveInteger(100).default(10),
  DB_CONNECT_TIMEOUT: positiveInteger(60000).default(10000),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const fields = [...new Set(result.error.issues.map(({ path }) => path[0]))];
  throw new Error(`Invalid environment configuration: ${fields.join(', ')}`);
}

export const env = result.data;
