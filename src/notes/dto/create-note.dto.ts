import { NoteEntity } from '@/notes/entities/note.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateNoteDto extends OmitType(NoteEntity, [
  'id',
  'created_by',
  'created_by_id',
]) {}
