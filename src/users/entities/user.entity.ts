import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';
import { IsDate, IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';

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

  @ApiProperty({ default: Role.USER, enum: Role })
  @IsEnum(Role)
  role: Role;

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
