import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BugreportService } from './bugreport.service';
import { CreateBugreportDto } from './dto/create-bugreport.dto';
import { UpdateBugreportDto } from './dto/update-bugreport.dto';

@Controller('bugreport')
export class BugreportController {
  constructor(private readonly bugreportService: BugreportService) {}

  @Post()
  create(@Body() createBugreportDto: CreateBugreportDto) {
    return this.bugreportService.create(createBugreportDto);
  }

  @Get()
  findAll() {
    return this.bugreportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bugreportService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBugreportDto: UpdateBugreportDto,
  ) {
    return this.bugreportService.update(+id, updateBugreportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bugreportService.remove(+id);
  }
}
