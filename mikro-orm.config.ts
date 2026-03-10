import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { envSchema } from './src/modules/config/env.schema';
import dotenv from 'dotenv';

dotenv.config();

const validatedEnv = envSchema.parse(process.env);

const ormConfig = defineConfig({
  driver: PostgreSqlDriver,
  clientUrl: validatedEnv.DATABASE_URL,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  migrations: {
    path: './dist/migrations',
    pathTs: './database/migrations',
  },
  debug: validatedEnv.NODE_ENV !== 'production',
});

export default ormConfig;
