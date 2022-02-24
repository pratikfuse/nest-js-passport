import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationRepository } from './repository/auth.repository';
import { scrypt, timingSafeEqual } from 'crypto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';

export interface JwtPayload {
  email: string;
  name: string;
  username: string;
  id: string;
  permissions: string[];
}

@Injectable()
export class AuthenticationService {
  constructor(
    private userRepository: AuthenticationRepository,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({
        email: email,
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      const [salt, key] = user.password.split(':');

      const isPasswordValid = await new Promise((resolve, reject) => {
        scrypt(password, salt, 64, function (err, hashedPassword) {
          if (err) {
            return reject(err);
          }
          if (!timingSafeEqual(Buffer.from(key, 'hex'), hashedPassword)) {
            return reject(new Error('Incorrect email or password'));
          }
          return resolve(true);
        });
      });

      if (!isPasswordValid) {
        throw new Error('Incorrect email or password');
      }

      return this._createToken(user);
    } catch (error) {
      throw error;
    }
  }

  async register(data: {
    username: string;
    email: string;
    password: string;
    name: string;
    permissions: string[];
  }) {
    try {
      return this.userRepository.createUser(data);
    } catch (error) {
      throw error;
    }
  }

  private _createToken({
    name,
    _id,
    email,
    username,
    permissions,
  }: Pick<
    UserDocument,
    'email' | 'name' | 'username' | '_id' | 'permissions'
  >): any {
    const user: JwtPayload = { email, id: _id, username, name, permissions };
    const accessToken = this.jwtService.sign(user, {
      privateKey: process.env.JWT_SECRET,
    });
    return {
      expiresIn: process.env.EXPIRESIN || 90000000,
      accessToken,
    };
  }
}
