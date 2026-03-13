import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment, ENVIRONMENT } from 'src/utils/constants';
import { AppConfig, DbConfig } from './env.config';

@Injectable()
export class AppConfigService {
  constructor(private config: ConfigService) {}

  get port(): AppConfig['port'] {
    return this.config.getOrThrow<number>('app.port');
  }

  get nodeEnv(): AppConfig['nodeEnv'] {
    return this.config.getOrThrow<Environment>('app.nodeEnv');
  }

  get databaseUrl(): DbConfig['databaseUrl'] {
    return this.config.getOrThrow<string>('db.databaseUrl');
  }

  get isProduction(): boolean {
    return this.nodeEnv === ENVIRONMENT.Production;
  }
}
