import { Request } from 'express';
import { Strategy } from 'passport-strategy';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { User } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionStrategy extends PassportStrategy(Strategy, 'session') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<User> {
    const token =
      ((req.cookies?.['session_token'] ||
        req.headers.authorization?.replace('Bearer ', '')) as string) ||
      undefined;

    if (!token) {
      throw new UnauthorizedException('Missing session token');
    }

    const user = await this.authService.validateSession(token);

    if (!user) {
      throw new UnauthorizedException('Invalid session');
    }

    return user;
  }
}
