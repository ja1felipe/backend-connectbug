import { PrismaService } from '@/prisma/prisma.service';
import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      },
    });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findMany(role: Role): Promise<User[]> {
    return await this.prisma.user.findMany({ where: { role } });
  }

  async findOne(id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const user = await this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });

    return {
      ...user,
      password: undefined,
    };
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    return user;
  }
}
