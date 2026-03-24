import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { AUTH_PROVIDER } from 'src/common/constants';

import { ConflictException, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/auth.dto';
import { Account } from './entities/account.entity';
import { hashPassword } from './utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private readonly usersService: UsersService,
    @InjectRepository(Account)
    private readonly accountRepository: EntityRepository<Account>,
  ) {}
  async register(registerDto: RegisterDto) {
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

    this.em.persist([newUser, newAccount]);
    await this.em.flush();

    return newUser;
  }
}
