import { ScreenshotEntity } from '@/screenshots/entities/screenshot.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateScreenshotDto extends OmitType(ScreenshotEntity, ['id']) {}
