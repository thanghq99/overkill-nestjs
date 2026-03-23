import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ENVIRONMENT, Environment } from '../../common/constants';
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

  get appUrl(): AppConfig['appUrl'] {
    return this.config.getOrThrow<string>('app.appUrl');
  }

  get appTitle(): AppConfig['appTitle'] {
    return this.config.getOrThrow<string>('app.appTitle');
  }

  get openRouterApiKey(): AppConfig['openRouterApiKey'] {
    return this.config.getOrThrow<string>('app.openRouterApiKey');
  }

  get databaseUrl(): DbConfig['databaseUrl'] {
    return this.config.getOrThrow<string>('db.databaseUrl');
  }

  get isProduction(): boolean {
    return this.nodeEnv === ENVIRONMENT.Production;
  }
}
