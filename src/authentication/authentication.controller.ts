import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { response } from 'express';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('authentication')
export class AuthenticationController {

  constructor(
    private authenticationService: AuthenticationService
  ){}

  @Post('/login')
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  async handleLogin(@Body() loginDto: LoginDto) {
    try {
    
      const response = await this.authenticationService.login(loginDto.email, loginDto.password);
      return response;
    } catch (error) {
      throw new UnauthorizedException('Incorrect email or password');
    }
  }

  @Post('/register')
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  async handleRegister(@Body() registerDto: RegisterDto) {
    try {
      
      await this.authenticationService.register({
        email: registerDto.email,
        password: registerDto.password,
        name: registerDto.name,
        username: registerDto.username,
        permissions: registerDto.permissions
      });
      return 'OK';
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
