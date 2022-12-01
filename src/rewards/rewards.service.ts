import { PrismaService } from '@/prisma/prisma.service';
import { Reward } from '@/rewards/entities/reward.entity';
import { Injectable } from '@nestjs/common';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';

@Injectable()
export class RewardsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    const reward = await this.prisma.reward.create({
      data: createRewardDto,
    });

    return reward;
  }

  async findAll(): Promise<Reward[]> {
    const rewards = await this.prisma.reward.findMany();
    return rewards;
  }

  async findOne(id: string): Promise<Reward> {
    const reward = await this.prisma.reward.findUnique({
      where: { id },
    });

    return reward;
  }

  async update(id: string, updateRewardDto: UpdateRewardDto): Promise<Reward> {
    const reward = await this.prisma.reward.update({
      where: { id },
      data: updateRewardDto,
    });

    return reward;
  }

  async remove(id: string) {
    const reward = await this.prisma.reward.delete({
      where: { id },
    });

    return reward;
  }
}
