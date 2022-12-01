import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsBoolean,
  ValidateIf,
  IsDate,
} from 'class-validator';

export class Reward implements Prisma.RewardCreateManyInput {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsBoolean()
  notification_active: boolean;

  @ApiProperty()
  @ValidateIf((o) => o.notification_active === true)
  @IsNotEmpty()
  @IsString()
  notification_title: string;

  @ApiProperty()
  @ValidateIf((o) => o.notification_active === true)
  @IsNotEmpty()
  @IsString()
  notification_text: string;

  @ApiProperty()
  @IsDate()
  created_at?: string | Date;

  @ApiProperty()
  @IsDate()
  updated_at?: string | Date;
}
