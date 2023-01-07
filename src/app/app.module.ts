import { AuthModule } from '@/auth/auth.module';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { BugReportModule } from '@/bugreport/bugreport.module';
import { NotesModule } from '@/notes/notes.module';
import { RewardsModule } from '@/rewards/rewards.module';
import { ScreenshotsModule } from '@/screenshots/screenshots.module';
import { StepsModule } from '@/steps/steps.module';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    BugReportModule,
    NotesModule,
    StepsModule,
    ScreenshotsModule,
    UsersModule,
    RewardsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
