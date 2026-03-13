import { z } from 'zod';
import { ENVIRONMENT } from '../../common/constants';

const envSchema = z.object({
  NODE_ENV: z.enum(Object.values(ENVIRONMENT) as [string, ...string[]]),
  PORT: z.coerce.number(),
  DATABASE_URL: z.url(),
});

export { envSchema };
