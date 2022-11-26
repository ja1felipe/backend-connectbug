import { BugreportModule } from '@/bugreport/bugreport.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BugreportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
