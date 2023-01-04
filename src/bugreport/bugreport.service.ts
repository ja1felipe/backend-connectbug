import { ConcludeBugReportDto } from '@/bugreport/dto/conclude-bugreport.dto';
import {
  BugReport,
  OmitedStepEntity,
} from '@/bugreport/entities/bugreport.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { ThumbSnapService } from '@/thumb-snap/thumb-snap.service';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Status } from '@prisma/client';
import { CreateBugReportDto } from './dto/create-bugreport.dto';
import { UpdateBugReportDto } from './dto/update-bugreport.dto';

@Injectable()
export class BugReportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly thumpSnapService: ThumbSnapService,
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
        created_at: true,
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
    files: Express.Multer.File[],
  ): Promise<BugReport> {
    let steps = undefined;
    if (createBugReportDto.steps) {
      const stepsString = createBugReportDto.steps as string;
      steps = JSON.parse(stepsString) as OmitedStepEntity;
    }

    let deviceInfos = undefined;
    if (createBugReportDto.deviceInfos) {
      const deviceInfosString = createBugReportDto.deviceInfos as string;
      deviceInfos = JSON.parse(deviceInfosString) as Prisma.JsonValue;
    }

    const screenshots = (await this.thumpSnapService.upload(files)).map(
      (url) => ({
        url,
      }),
    );
    const bugReport = await this.prisma.bugReport.create({
      data: {
        ...createBugReportDto,
        deviceInfos,
        created_by_id: 'd85e6024-b614-4bef-a207-41f01d787656',
        steps: { create: steps },
        screenshots: { create: screenshots },
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

  async conclude(
    id: string,
    concludeBugReportDto: ConcludeBugReportDto,
  ): Promise<BugReport> {
    const bugReport = await this.prisma.bugReport.findUnique({
      where: { id },
    });

    if (bugReport.status !== Status.ACCEPT) {
      throw new BadRequestException(
        'Only bug reports with status: "ACCEPT" can be closed',
      );
    }

    const updateData: Prisma.BugReportUncheckedUpdateInput = {
      status: Status.CLOSED,
    };

    if (concludeBugReportDto.reward_id) {
      updateData.reward_id = concludeBugReportDto.reward_id;
    }

    const bugReportUpdated = await this.prisma.bugReport.update({
      data: updateData,
      where: { id },
      include: this._include,
    });

    if (bugReportUpdated.reward) {
      this.httpService.axiosRef
        .post(bugReportUpdated.reward.url, {
          user_id: bugReportUpdated.created_by_id,
          user_email: bugReportUpdated.created_by.email,
          bug_report_id: bugReportUpdated.id,
        })
        .then(() => {
          console.log(
            `Webhook sent to ${bugReportUpdated.reward.url} after bug report ${bugReportUpdated.id} be conclueded.`,
          );
        })
        .catch((err) => {
          console.error(
            `Error sending reward webhook request of bug report with id ${bugReportUpdated.id}`,
            err,
          );
        });
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
