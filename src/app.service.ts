import { Injectable } from '@nestjs/common';
import { User } from './authentication/schemas/user.schema';

@Injectable()
export class AppService {
  getHello(user: Pick<User, 'name'>): string {
    return `Hello ${user.name}`;
  }
}
