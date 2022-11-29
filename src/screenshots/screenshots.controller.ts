import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScreenshotsService } from './screenshots.service';
import { CreateScreenshotDto } from './dto/create-screenshot.dto';
import { UpdateScreenshotDto } from './dto/update-screenshot.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ScreenshotEntity } from '@/screenshots/entities/screenshot.entity';

@Controller('screenshots')
@ApiTags('Screenshots')
export class ScreenshotsController {
  constructor(private readonly screenshotsService: ScreenshotsService) {}

  @Post()
  @ApiCreatedResponse({ type: ScreenshotEntity })
  create(@Body() createScreenshotDto: CreateScreenshotDto) {
    return this.screenshotsService.create(createScreenshotDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ScreenshotEntity })
  update(
    @Param('id') id: string,
    @Body() updateScreenshotDto: UpdateScreenshotDto,
  ) {
    return this.screenshotsService.update(id, updateScreenshotDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ScreenshotEntity })
  remove(@Param('id') id: string) {
    return this.screenshotsService.remove(id);
  }
}
