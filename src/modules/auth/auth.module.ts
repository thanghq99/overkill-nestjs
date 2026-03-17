import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Session } from './entities/session.entity';
import { Account } from './entities/account.entity';
import { Verification } from './entities/verification.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Session, Account, Verification]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
