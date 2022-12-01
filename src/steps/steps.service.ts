import { PrismaService } from '@/prisma/prisma.service';
import { StepEntity } from '@/steps/entities/step.entity';
import { Injectable } from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';

@Injectable()
export class StepsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStepDto: CreateStepDto): Promise<StepEntity> {
    const step = await this.prisma.step.create({
      data: createStepDto,
    });

    return step;
  }

  async update(id: string, updateStepDto: UpdateStepDto): Promise<StepEntity> {
    const step = await this.prisma.step.update({
      data: updateStepDto,
      where: { id },
    });

    return step;
  }

  async remove(id: string): Promise<StepEntity> {
    const step = await this.prisma.step.delete({
      where: { id },
    });

    return step;
  }
}
