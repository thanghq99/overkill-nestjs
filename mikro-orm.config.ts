import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { envSchema } from './src/modules/config/env.schema';
import dotenv from 'dotenv';

dotenv.config();

const validatedEnv = envSchema.parse(process.env);

const ormConfig = defineConfig({
  driver: PostgreSqlDriver,
  clientUrl: validatedEnv.DATABASE_URL,
  entities: ['./dist/**/entities/*.entity.js'],
  entitiesTs: ['./src/**/entities/*.entity.ts'],
  migrations: {
    path: './dist/migrations',
    pathTs: './database/migrations',
  },
  debug: validatedEnv.NODE_ENV !== 'production',
  schemaGenerator: {
    ignoreSchema: [
      'auth',
      'storage',
      'realtime',
      'vault',
      'extensions',
      'net',
      'graphql',
      'graphql_public',
      'pgbouncer',
      'pgsodium',
      'pgsodium_masks',
    ],
  },
});

export default ormConfig;
