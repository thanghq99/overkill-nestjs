import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
