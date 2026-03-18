import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}

export class LoginDto {
  email: string;

  password: string;
}
