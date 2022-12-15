import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ConcludeBugReportDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  reward_id?: string;
}
