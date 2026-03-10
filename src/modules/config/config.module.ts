import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env.schema';
import { appConfig, dbConfig } from './env.config';
import { AppConfigService } from './config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: (config) => envSchema.parse(config),
      load: [appConfig, dbConfig],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class CustomConfigModule {}
