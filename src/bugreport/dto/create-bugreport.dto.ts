import { BugReport } from '@/bugreport/entities/bugreport.entity';
import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CreateBugReportDto extends OmitType(BugReport, [
  'notes',
  'id',
  'reward',
  'assigned_to_id',
  'reward_id',
  'status',
  'screenshots',
]) {
  @Exclude()
  @ApiHideProperty()
  notes?: Prisma.NoteUncheckedCreateNestedManyWithoutBug_reportInput;
}
