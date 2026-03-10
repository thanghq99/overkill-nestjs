import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENVIRONMENT } from 'src/utils/constants';

@Injectable()
export class AppConfigService {
  constructor(private config: ConfigService) {}

  get port(): number {
    return this.config.get<number>('app.port') || 3000;
  }

  get nodeEnv(): string {
    return this.config.get<string>('app.nodeEnv') || ENVIRONMENT.Development;
  }

  get databaseUrl(): string {
    return (
      this.config.get<string>('db.databaseUrl') ||
      'postgresql://postgres:postgres@localhost:5432/postgres'
    );
  }

  get isProduction(): boolean {
    return this.nodeEnv === ENVIRONMENT.Production;
  }
}
