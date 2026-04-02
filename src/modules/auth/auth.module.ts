import { MikroOrmModule } from '@mikro-orm/nestjs';

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Account } from './entities/account.entity';
import { Session } from './entities/session.entity';
import { Verification } from './entities/verification.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { LocalStrategy } from './local.strategy';
import { SessionStrategy } from './strategies/session.strategy';

@Module({
  imports: [
    MikroOrmModule.forFeature([Session, Account, Verification]),
    PassportModule.register({ session: false }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    SessionStrategy,
    AuthService,
    LocalAuthGuard,
    SessionAuthGuard,
  ],
})
export class AuthModule {}
