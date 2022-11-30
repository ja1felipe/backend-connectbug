import { Role } from '@prisma/client';

export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  role: Role;
  external_id: string;
  iat?: number;
  exp?: number;
}
