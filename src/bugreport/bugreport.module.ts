import { Module } from '@nestjs/common';
import { BugReportService } from './bugreport.service';
import { BugReportController } from './bugreport.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [BugReportController],
  providers: [BugReportService],
  imports: [PrismaModule],
})
export class BugReportModule {}
