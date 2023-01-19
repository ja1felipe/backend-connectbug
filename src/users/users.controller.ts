import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '@/auth/decorators/roles.decorator';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { User } from '@/users/entities/user.entity';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { UserFromJwt } from '@/auth/models/user-from-jwt.model';

@Controller('users')
@ApiTags('Users')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiQuery({
    name: 'role',
    type: String,
    enum: Role,
    required: false,
  })
  @ApiOkResponse({ type: User })
  findMany(@Query('role') role?: Role) {
    return this.usersService.findMany(role);
  }

  @Patch(':id')
  @ApiOkResponse({ type: User })
  update(
    @Param('id') id: string,
    @CurrentUser() user: UserFromJwt,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (updateUserDto.password && user.id !== id) {
      delete updateUserDto.password;
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: User })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
