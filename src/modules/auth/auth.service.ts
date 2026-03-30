import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { plainToInstance } from 'class-transformer';
import { AUTH_PROVIDER } from 'src/common/constants';

import { ConflictException, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { AuthResponseDto, RegisterDto } from './dto/auth.dto';
import { Account } from './entities/account.entity';
import { comparePassword, hashPassword } from './utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private readonly usersService: UsersService,
    @InjectRepository(Account)
    private readonly accountRepository: EntityRepository<Account>,
  ) {}

  async register(registerDto: RegisterDto) {
    return await this.em.transactional(async (currentEm) => {
      const { email } = registerDto;

      const existingUser = await this.usersService.findOneByEmail(email);

      if (existingUser) {
        throw new ConflictException('Email already used');
      }

      const hashedPassword = await hashPassword(registerDto.password);
      const newUser = this.usersService.create(registerDto);
      const newAccount = this.accountRepository.create({
        user: newUser,
        accountId: newUser.id,
        providerId: AUTH_PROVIDER.Credentials,
        password: hashedPassword,
      });

      currentEm.persist([newUser, newAccount]);
      await currentEm.flush();

      return plainToInstance(
        AuthResponseDto,
        {
          user: newUser,
          account: newAccount,
        },
        { excludeExtraneousValues: true },
      );
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) return null;

    const account = await this.accountRepository.findOne({
      user,
      providerId: AUTH_PROVIDER.Credentials,
    });

    if (!account || !account.password) return null;

    const isPasswordValid = await comparePassword(password, account.password);

    if (!isPasswordValid) return null;

    return user;
  }
}
