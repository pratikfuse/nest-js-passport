import { Injectable, Module, NestMiddleware } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { NextFunction } from 'express';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/authentication'),
    AuthenticationModule,
    EasyconfigModule.register({
      sampleFilePath: '.env.sample',
      debug: true,
      path: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
