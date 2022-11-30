export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  role_id: string;
  external_id: string;
  iat?: number;
  exp?: number;
}
