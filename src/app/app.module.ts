import { BugReportModule } from '@/bugreport/bugreport.module';
import { NotesModule } from '@/notes/notes.module';
import { ScreenshotsModule } from '@/screenshots/screenshots.module';
import { StepsModule } from '@/steps/steps.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BugReportModule, NotesModule, StepsModule, ScreenshotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
