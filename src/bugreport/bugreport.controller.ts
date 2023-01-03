import { Roles } from '@/auth/decorators/roles.decorator';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { ConcludeBugReportDto } from '@/bugreport/dto/conclude-bugreport.dto';
import { BugReport } from '@/bugreport/entities/bugreport.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { BugReportService } from './bugreport.service';
import { CreateBugReportDto } from './dto/create-bugreport.dto';
import { UpdateBugReportDto } from './dto/update-bugreport.dto';

@Controller('bugreport')
@ApiTags('BugReports')
export class BugReportController {
  constructor(private readonly bugReportService: BugReportService) {}

  @Post()
  @ApiCreatedResponse({ type: BugReport })
  @UseInterceptors(FilesInterceptor('screenshots'))
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createBugReportDto: CreateBugReportDto,
  ) {
    return this.bugReportService.create(createBugReportDto, files);
  }

  @Get()
  @ApiOkResponse({ type: BugReport, isArray: true })
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DEV, Role.QA)
  findAll() {
    return this.bugReportService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BugReport })
  findOne(@Param('id') id: string) {
    return this.bugReportService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BugReport })
  update(
    @Param('id') id: string,
    @Body() updateBugReportDto: UpdateBugReportDto,
  ) {
    return this.bugReportService.update(id, updateBugReportDto);
  }

  @Patch('conclude/:id')
  @ApiOkResponse({ type: BugReport })
  conclude(
    @Param('id') id: string,
    @Body() concludeBugReportDto: ConcludeBugReportDto,
  ) {
    return this.bugReportService.conclude(id, concludeBugReportDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BugReport })
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DEV, Role.QA)
  remove(@Param('id') id: string) {
    return this.bugReportService.remove(id);
  }
}
