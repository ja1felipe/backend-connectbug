import { ApiProperty } from '@nestjs/swagger';
import { Note } from '@prisma/client';
import { IsString } from 'class-validator';

export class NoteEntity implements Note {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  note: string;

  @ApiProperty()
  @IsString()
  bug_report_id: string;
}
