import { BugReport } from '@/bugreport/entities/bugreport.entity';
import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CreateBugReportDto extends OmitType(BugReport, [
  'created_by_id',
  'notes',
  'id',
]) {
  @Exclude()
  @ApiHideProperty()
  notes?: Prisma.NoteUncheckedCreateNestedManyWithoutBug_reportInput;
}
