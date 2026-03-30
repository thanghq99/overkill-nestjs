import { MikroOrmModule } from '@mikro-orm/nestjs';

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Account } from './entities/account.entity';
import { Session } from './entities/session.entity';
import { Verification } from './entities/verification.entity';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    MikroOrmModule.forFeature([Session, Account, Verification]),
    PassportModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService],
})
export class AuthModule {}
