import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { Roles } from '@/auth/decorators/roles.decorator';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { UserFromJwt } from '@/auth/models/user-from-jwt.model';
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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { BugReportService } from './bugreport.service';
import { CreateBugReportDto } from './dto/create-bugreport.dto';
import { UpdateBugReportDto } from './dto/update-bugreport.dto';

@ApiBearerAuth()
@Controller('bugreport')
@ApiTags('BugReports')
export class BugReportController {
  constructor(private readonly bugReportService: BugReportService) {}

  @Post()
  @ApiCreatedResponse({ type: BugReport })
  create(
    @Body() createBugReportDto: CreateBugReportDto,
    @CurrentUser() user: UserFromJwt,
  ) {
    const id = user.id;
    return this.bugReportService.create(createBugReportDto, id);
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
  conclude(@Param('id') id: string) {
    return this.bugReportService.conclude(id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BugReport })
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DEV, Role.QA)
  remove(@Param('id') id: string) {
    return this.bugReportService.remove(id);
  }
}
