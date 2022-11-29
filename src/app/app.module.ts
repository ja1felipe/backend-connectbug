import { BugReportModule } from '@/bugreport/bugreport.module';
import { NotesModule } from '@/notes/notes.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BugReportModule, NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
