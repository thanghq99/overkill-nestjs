import { Expose, Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'User password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'User display name' })
  @IsString()
  name: string;
}

export class LoginDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'User password' })
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
