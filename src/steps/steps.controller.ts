import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StepsService } from './steps.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StepEntity } from '@/steps/entities/step.entity';

@ApiBearerAuth()
@Controller('steps')
@ApiTags('Steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Post()
  @ApiCreatedResponse({ type: StepEntity })
  create(@Body() createStepDto: CreateStepDto) {
    return this.stepsService.create(createStepDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: StepEntity })
  update(@Param('id') id: string, @Body() updateStepDto: UpdateStepDto) {
    return this.stepsService.update(id, updateStepDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: StepEntity })
  remove(@Param('id') id: string) {
    return this.stepsService.remove(id);
  }
}
