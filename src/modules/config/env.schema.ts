import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('development'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.url(),
});

export { envSchema };
