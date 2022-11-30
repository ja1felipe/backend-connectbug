import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsDate, IsEmail, IsString, IsUUID } from 'class-validator';

export class User implements Prisma.UserCreateManyInput {
  @ApiProperty({ readOnly: true })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiHideProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  role_id: string;

  @ApiProperty({ required: false })
  @IsString()
  external_id: string;

  @ApiProperty({ readOnly: true })
  @IsDate()
  created_at: Date;

  @ApiProperty({ readOnly: true })
  @IsDate()
  updated_at: Date;
}
