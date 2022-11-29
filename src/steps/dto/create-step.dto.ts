import { StepEntity } from '@/steps/entities/step.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateStepDto extends OmitType(StepEntity, ['id']) {}
