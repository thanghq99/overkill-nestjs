import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';

import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    await this.em.persist(user).flush();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    wrap(user).assign(updateUserDto);
    await this.em.flush();

    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.deletedAt = new Date();
    await this.em.flush();

    return user;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ id: id });
  }

  async findOneByEmail(email: string) {
    return (await this.userRepository.findOne({ email })) ?? null;
  }
}
