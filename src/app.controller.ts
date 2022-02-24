import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { PermissionsGuard } from './authentication/guards/permission.guard';
import { Permissions } from './authentication/permission.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get()
  @Permissions('say:hello')
  getHello(@Request() req: any): string {
    return this.appService.getHello(req.user);
  }
}
