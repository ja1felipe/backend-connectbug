import { BugReport } from '@/bugreport/entities/bugreport.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateBugReportDto } from './dto/create-bugreport.dto';
import { UpdateBugReportDto } from './dto/update-bugreport.dto';

@Injectable()
export class BugReportService {
  constructor(private prisma: PrismaService) {}

  private readonly _include = {
    steps: {
      select: {
        description: true,
      },
    },
    notes: {
      select: {
        note: true,
      },
    },
    screenshots: {
      select: {
        url: true,
      },
    },
  };

  async create(
    createBugReportDto: CreateBugReportDto,
    createdById: string,
  ): Promise<BugReport> {
    const bugReport = await this.prisma.bugReport.create({
      data: {
        ...createBugReportDto,
        created_by_id: createdById,
        steps: { create: createBugReportDto.steps },
        screenshots: { create: createBugReportDto.screenshots },
      },
      include: this._include,
    });

    return bugReport;
  }

  async findAll(): Promise<BugReport[]> {
    const bugReports = await this.prisma.bugReport.findMany({
      include: this._include,
    });

    return bugReports;
  }

  async findOne(id: string): Promise<BugReport> {
    const bugReport = await this.prisma.bugReport.findUnique({
      where: { id },
      include: this._include,
    });

    return bugReport;
  }

  async update(
    id: string,
    updateBugReportDto: UpdateBugReportDto,
  ): Promise<BugReport> {
    const bugReport = await this.prisma.bugReport.update({
      data: updateBugReportDto,
      where: { id },
      include: this._include,
    });

    return bugReport;
  }

  async remove(id: string) {
    const bugReport = await this.prisma.bugReport.delete({
      where: { id },
      include: this._include,
    });

    return bugReport;
  }
}
