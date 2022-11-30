import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IsPublic } from './decorators/is-public.decorator';
import { AuthRequest } from '@/auth/models/auth-request.model';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserToken } from '@/auth/models/user-token.model';
import { LoginRequestBody } from '@/auth/models/login-request-body.model';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserToken })
  @ApiBody({ type: LoginRequestBody })
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
