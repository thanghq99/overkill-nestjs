import { Environment } from 'src/common/constants';

import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV as Environment,
}));

export const dbConfig = registerAs('db', () => ({
  databaseUrl: process.env.DATABASE_URL!,
}));

export type AppConfig = ReturnType<typeof appConfig>;
export type DbConfig = ReturnType<typeof dbConfig>;
