import { Module } from '@nestjs/common';
import { BugReportService } from './bugreport.service';
import { BugReportController } from './bugreport.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { ThumbSnapModule } from '@/thumb-snap/thump-snap.module';

@Module({
  controllers: [BugReportController],
  providers: [BugReportService],
  imports: [PrismaModule, HttpModule, ThumbSnapModule],
})
export class BugReportModule {}
