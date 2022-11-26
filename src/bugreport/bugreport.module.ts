import { Module } from '@nestjs/common';
import { BugreportService } from './bugreport.service';
import { BugreportController } from './bugreport.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [BugreportController],
  providers: [BugreportService],
  imports: [PrismaModule],
})
export class BugreportModule {}
