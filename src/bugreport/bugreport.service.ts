import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateBugreportDto } from './dto/create-bugreport.dto';
import { UpdateBugreportDto } from './dto/update-bugreport.dto';

@Injectable()
export class BugreportService {
  constructor(private prisma: PrismaService) {}

  create(createBugreportDto: CreateBugreportDto) {
    return 'This action adds a new bugreport';
  }

  findAll() {
    return this.prisma.bugReport.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} bugreport`;
  }

  update(id: number, updateBugreportDto: UpdateBugreportDto) {
    return `This action updates a #${id} bugreport`;
  }

  remove(id: number) {
    return `This action removes a #${id} bugreport`;
  }
}
