import { EntityManager } from '@mikro-orm/postgresql';

import { ConflictException, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private readonly usersService: UsersService,
  ) {}
  async register(registerDto: RegisterDto) {
    const { email } = registerDto;

    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already used');
    }

    const newUser = await this.usersService.create(registerDto);

    await this.em.persist(newUser).flush();

    return newUser;
  }
}
