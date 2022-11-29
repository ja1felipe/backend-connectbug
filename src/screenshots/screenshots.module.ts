import { Module } from '@nestjs/common';
import { ScreenshotsService } from './screenshots.service';
import { ScreenshotsController } from './screenshots.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [ScreenshotsController],
  providers: [ScreenshotsService],
  imports: [PrismaModule],
})
export class ScreenshotsModule {}
