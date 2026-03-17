import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    return `Trying to register user with email: ${email}, password: ${password}, name: ${name}`;
  }
}
