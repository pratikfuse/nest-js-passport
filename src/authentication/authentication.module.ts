import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthenticationRepository } from './repository/auth.repository';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  controllers: [AuthenticationController, AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, AuthenticationRepository],
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt', 
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      secretOrPrivateKey: process.env.JWT_SECRET,
      privateKey: process.env.JWT_SECRET,
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  exports: [PassportModule, JwtStrategy],
})
export class AuthenticationModule {}
