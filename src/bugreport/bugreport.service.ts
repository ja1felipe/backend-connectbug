import { BugReport } from '@/bugreport/entities/bugreport.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { CreateBugReportDto } from './dto/create-bugreport.dto';
import { UpdateBugReportDto } from './dto/update-bugreport.dto';

@Injectable()
export class BugReportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  private readonly _include = {
    steps: {
      select: {
        id: true,
        description: true,
      },
    },
    notes: {
      select: {
        id: true,
        note: true,
        created_by: true,
      },
    },
    screenshots: {
      select: {
        id: true,
        url: true,
      },
    },
    reward: true,
    created_by: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
    assigned_to: {
      select: {
        id: true,
        name: true,
        email: true,
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

  async conclude(id: string): Promise<BugReport> {
    const bugReport = await this.prisma.bugReport.findUnique({
      where: { id },
    });

    if (bugReport.status !== Status.ACCEPT) {
      throw new BadRequestException(
        'Only bug reports with status: "ACCEPT" can be closed',
      );
    }

    const bugReportUpdated = await this.prisma.bugReport.update({
      data: {
        status: Status.CLOSED,
      },
      where: { id },
      include: this._include,
    });

    if (bugReportUpdated.reward) {
      try {
        this.httpService.post(bugReportUpdated.reward.url, {
          user_id: bugReportUpdated.created_by_id,
          bug_report_id: bugReportUpdated.id,
          bug_report_external_id: bugReportUpdated.external_id,
          bug_report_assigned_to_id: bugReportUpdated.assigned_to_id,
        });
      } catch (err) {
        console.error(
          `Error sending reward webhook request of bug report with id ${bugReportUpdated.id}`,
        );
      }
    }

    return bugReportUpdated;
  }

  async remove(id: string) {
    const bugReport = await this.prisma.bugReport.delete({
      where: { id },
      include: this._include,
    });

    return bugReport;
  }
}
