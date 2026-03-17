import { z } from 'zod';

import { ENVIRONMENT } from '../../common/constants';

const envSchema = z.object({
  NODE_ENV: z
    .enum(Object.values(ENVIRONMENT) as [string, ...string[]])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  CORS_ORIGIN: z.string().default('*'),
  FRONTEND_URL: z.string().url().optional(),

  // DATABASE
  DATABASE_URL: z.string().url(),

  // AUTHENTICATION
  JWT_SECRET: z
    .string()
    .min(32, 'JWT secret must be at least 32 characters')
    .optional(),
  JWT_EXPIRES_IN: z.string().default('1d'),
  REFRESH_TOKEN_SECRET: z
    .string()
    .min(32, 'Refresh token secret must be at least 32 chars')
    .optional(),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),

  // EXTERNAL INFRA (AWS)
  AWS_REGION: z.string().optional(),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),

  // CACHE
  REDIS_URL: z.string().url().optional(),
});

export { envSchema };
