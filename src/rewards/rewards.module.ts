import { Module } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [RewardsController],
  providers: [RewardsService],
  imports: [PrismaModule, HttpModule],
})
export class RewardsModule {}
