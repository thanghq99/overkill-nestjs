import { plainToInstance } from 'class-transformer';
import { Request, type Response } from 'express';

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, UserResponseDto } from './dto/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SessionAuthGuard } from './guards/session-auth.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() _loginDto: LoginDto,
    @Req() req: Request & { user: User },
    @Res({ passthrough: true }) res: Response,
  ) {
    const session = await this.authService.createSession(
      req.user,
      req.headers['user-agent'],
      req.ip,
    );

    res.cookie('session_token', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return {
      message: 'Login successful',
      token: session.token,
      user: plainToInstance(UserResponseDto, req.user, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @UseGuards(SessionAuthGuard)
  @Get('me')
  getMe(@Req() req: Request & { user: User }) {
    return req.user;
  }
}
