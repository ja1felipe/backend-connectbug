import { ApiProperty } from '@nestjs/swagger';

export class UserToken {
  @ApiProperty({ description: 'jwt token for authentication' })
  access_token: string;
}
