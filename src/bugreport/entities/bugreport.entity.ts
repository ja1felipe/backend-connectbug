import { NoteEntity } from '@/notes/entities/note.entity';
import { Reward } from '@/rewards/entities/reward.entity';
import { ScreenshotEntity } from '@/screenshots/entities/screenshot.entity';
import { StepEntity } from '@/steps/entities/step.entity';
import { OmitType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Status } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsDate,
  IsJSON,
} from 'class-validator';

class OmitedScreenshotEntity extends OmitType(ScreenshotEntity, [
  'bug_report_id',
] as const) {}

export class OmitedStepEntity extends OmitType(StepEntity, [
  'bug_report_id',
] as const) {}

class OmitedNoteEntity extends OmitType(NoteEntity, [
  'bug_report_id',
  'created_by_id',
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

  @ApiProperty()
  @IsString()
  steps?: string | OmitedStepEntity[];

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

  @ApiProperty()
  @IsJSON()
  @IsOptional()
  deviceInfos?: string | Prisma.JsonValue;

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
