import { NoteEntity } from '@/notes/entities/note.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    createNoteDto: CreateNoteDto,
  ): Promise<NoteEntity> {
    const note = await this.prisma.note.create({
      data: {
        ...createNoteDto,
        created_by_id: userId,
      },
      include: {
        created_by: true,
      },
    });

    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const note = await this.prisma.note.update({
      data: updateNoteDto,
      where: { id: id },
    });

    return note;
  }

  async remove(id: string): Promise<NoteEntity> {
    const note = await this.prisma.note.delete({
      where: { id },
    });
    return note;
  }
}
