import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Status } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateBugReportDto
  implements Prisma.BugReportUncheckedUpdateManyInput
{
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: Status, required: false })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  assigned_to_id?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  external_id?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  reward_id?: string;
}
