import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateStepDto } from './create-step.dto';

export class UpdateStepDto extends PartialType(
  OmitType(CreateStepDto, ['bug_report_id']),
) {}
