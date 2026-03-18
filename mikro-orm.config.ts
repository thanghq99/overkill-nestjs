import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';
import dotenv from 'dotenv';

import { envSchema } from './src/modules/config/env.schema';

dotenv.config();

const validatedEnv = envSchema.parse(process.env);

const ormConfig = defineConfig({
  driver: PostgreSqlDriver,
  clientUrl: validatedEnv.DATABASE_URL,
  entities: [
    './dist/src/common/entities/CustomBaseEntity.js',
    './dist/**/entities/*.entity.js',
  ],
  entitiesTs: [
    './src/common/entities/CustomBaseEntity.ts',
    './src/**/entities/*.entity.ts',
  ],
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
