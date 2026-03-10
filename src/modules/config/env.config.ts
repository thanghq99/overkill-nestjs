import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV,
}));

export const dbConfig = registerAs('db', () => ({
  databaseUrl: process.env.DATABASE_URL,
}));
