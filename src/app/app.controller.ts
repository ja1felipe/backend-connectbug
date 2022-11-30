import { Roles } from '@/auth/decorators/roles.decorator';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('USER', 'DEV')
  getHello(): string {
    return this.appService.getHello();
  }
}
