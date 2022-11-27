import { ApiProperty } from '@nestjs/swagger';
import { Step } from '@prisma/client';
import { IsString } from 'class-validator';

export class StepEntity implements Step {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  bug_report_id: string;
}
