import { Expose, Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginResponseDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}

export class UserResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}

export class AccountResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  providerId: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}

export class AuthResponseDto {
  @ApiProperty({ type: UserResponseDto })
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  @ApiProperty({ type: AccountResponseDto })
  @Expose()
  @Type(() => AccountResponseDto)
  account: AccountResponseDto;
}
