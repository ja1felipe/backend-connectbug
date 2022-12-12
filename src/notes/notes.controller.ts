import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NoteEntity } from '@/notes/entities/note.entity';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { UserFromJwt } from '@/auth/models/user-from-jwt.model';

@ApiBearerAuth()
@Controller('notes')
@ApiTags('Notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiCreatedResponse({ type: NoteEntity })
  create(
    @Body() createNoteDto: CreateNoteDto,
    @CurrentUser() user: UserFromJwt,
  ) {
    return this.notesService.create(user.id, createNoteDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: NoteEntity })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: NoteEntity })
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
