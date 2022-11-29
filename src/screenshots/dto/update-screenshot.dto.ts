import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateScreenshotDto } from './create-screenshot.dto';

export class UpdateScreenshotDto extends PartialType(
  OmitType(CreateScreenshotDto, ['bug_report_id']),
) {}
