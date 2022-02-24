import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsArray, IsEmail, IsString } from 'class-validator';
import { createHash, createHmac } from 'crypto';
import { saltHashPassword } from '../utils';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => saltHashPassword(value))
  @IsString()
  password: string;

  @IsAlphanumeric()
  username: string;

  @IsArray()
  permissions: string[];
}
