import { User } from '@/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Note } from '@prisma/client';
import { Type } from 'class-transformer';
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

  @ApiProperty()
  @IsString()
  created_by_id: string;

  @ApiProperty({
    type: User,
  })
  @Type(() => User)
  created_by?: User;
}
