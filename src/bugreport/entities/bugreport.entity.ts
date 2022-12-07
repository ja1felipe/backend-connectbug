import { NoteEntity } from '@/notes/entities/note.entity';
import { Reward } from '@/rewards/entities/reward.entity';
import { ScreenshotEntity } from '@/screenshots/entities/screenshot.entity';
import { StepEntity } from '@/steps/entities/step.entity';
import { OmitType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Status } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsArray, IsEnum, IsDate } from 'class-validator';

class OmitedScreenshotEntity extends OmitType(ScreenshotEntity, [
  'id',
  'bug_report_id',
] as const) {}

class OmitedStepEntity extends OmitType(StepEntity, [
  'id',
  'bug_report_id',
] as const) {}

class OmitedNoteEntity extends OmitType(NoteEntity, [
  'id',
  'bug_report_id',
] as const) {}

export class BugReport implements Prisma.BugReportCreateManyInput {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({
    type: [OmitedStepEntity],
  })
  @Type(() => OmitedStepEntity)
  @IsArray()
  steps?: OmitedStepEntity[];

  @ApiProperty({
    type: [OmitedScreenshotEntity],
  })
  @Type(() => OmitedScreenshotEntity)
  @IsArray()
  screenshots?: OmitedScreenshotEntity[];

  @ApiProperty({
    type: [OmitedNoteEntity],
  })
  @Type(() => OmitedNoteEntity)
  @IsArray()
  notes?: OmitedNoteEntity[];

  @ApiProperty({
    type: Reward,
  })
  @Type(() => Reward)
  reward?: Reward;

  @ApiProperty()
  @IsString()
  created_by_id: string;

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

  @ApiProperty({ default: Status.PENDING, enum: Status, required: false })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty({ readOnly: true, required: false })
  @IsDate()
  @IsOptional()
  created_at?: string | Date;

  @ApiProperty({ readOnly: true, required: false })
  @IsDate()
  @IsOptional()
  updated_at?: string | Date;
}
