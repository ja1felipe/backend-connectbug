import { PrismaService } from '@/prisma/prisma.service';
import { ScreenshotEntity } from '@/screenshots/entities/screenshot.entity';
import { Injectable } from '@nestjs/common';
import { CreateScreenshotDto } from './dto/create-screenshot.dto';
import { UpdateScreenshotDto } from './dto/update-screenshot.dto';

@Injectable()
export class ScreenshotsService {
  constructor(private readonly psima: PrismaService) {}

  async create(
    createScreenshotDto: CreateScreenshotDto,
  ): Promise<ScreenshotEntity> {
    const screenshot = await this.psima.screenshot.create({
      data: createScreenshotDto,
    });

    return screenshot;
  }

  async update(
    id: string,
    updateScreenshotDto: UpdateScreenshotDto,
  ): Promise<ScreenshotEntity> {
    const screenshot = await this.psima.screenshot.update({
      data: updateScreenshotDto,
      where: { id },
    });

    return screenshot;
  }

  async remove(id: string): Promise<ScreenshotEntity> {
    const screenshot = await this.psima.screenshot.delete({
      where: { id },
    });

    return screenshot;
  }
}
