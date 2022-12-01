import { Module } from '@nestjs/common';
import { BugReportService } from './bugreport.service';
import { BugReportController } from './bugreport.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [BugReportController],
  providers: [BugReportService],
  imports: [PrismaModule, HttpModule],
})
export class BugReportModule {}
