import { ThumbSnapService } from '@/thumb-snap/thumb-snap.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [ThumbSnapService],
  exports: [ThumbSnapService],
})
export class ThumbSnapModule {}
