import { NoteEntity } from '@/notes/entities/note.entity';
import { ScreenshotEntity } from '@/bugreport/entities/screenshot.entity';
import { StepEntity } from '@/bugreport/entities/step.entity';
import { OmitType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Status } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';

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
  steps?: OmitedStepEntity[];

  @ApiProperty({
    type: [OmitedScreenshotEntity],
  })
  @Type(() => OmitedScreenshotEntity)
  screenshots?: OmitedScreenshotEntity[];

  @ApiProperty({
    type: [OmitedNoteEntity],
  })
  @Type(() => OmitedNoteEntity)
  @IsArray()
  notes?: OmitedNoteEntity[];

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

  @ApiProperty({ default: Status.PENDING, enum: Status })
  @IsEnum(Status)
  status?: Status;

  created_at?: string | Date;
  updated_at?: string | Date;
}
