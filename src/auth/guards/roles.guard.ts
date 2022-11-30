import { AuthRequest } from '@/auth/models/auth-request.model';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest() as AuthRequest;
    const user = request.user;
    if (roles.includes(user.role)) {
      return true;
    }

    throw new UnauthorizedException(
      'User dont has permission to access this route',
    );
  }
}
