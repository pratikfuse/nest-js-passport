import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthenticationRepository {
  constructor(@InjectModel(User.name) private authModel: Model<UserDocument>) {}

  async findOne(obj: Partial<User>): Promise<UserDocument> {
    return this.authModel.findOne(obj);
  }

  async createUser(user: User) {
    return this.authModel.create(user);
  }
}
