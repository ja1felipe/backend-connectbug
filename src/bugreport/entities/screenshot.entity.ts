import { ApiProperty } from '@nestjs/swagger';
import { Screenshot } from '@prisma/client';
import { IsString } from 'class-validator';

export class ScreenshotEntity implements Screenshot {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsString()
  bug_report_id: string;
}
