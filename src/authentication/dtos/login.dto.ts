import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { scryptSync } from 'crypto';
import { saltHashPassword } from '../utils';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
