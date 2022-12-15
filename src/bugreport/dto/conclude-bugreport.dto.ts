import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ConcludeBugReportDto {
  @ApiProperty()
  @IsString()
  reward_id: string;
}
