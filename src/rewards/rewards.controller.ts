import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Reward } from '@/rewards/entities/reward.entity';

@ApiBearerAuth()
@Controller('rewards')
@ApiTags('Rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Post()
  @ApiCreatedResponse({ type: Reward })
  create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardsService.create(createRewardDto);
  }

  @Get()
  @ApiOkResponse({ type: Reward })
  findAll() {
    return this.rewardsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Reward })
  findOne(@Param('id') id: string) {
    return this.rewardsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Reward })
  update(@Param('id') id: string, @Body() updateRewardDto: UpdateRewardDto) {
    return this.rewardsService.update(id, updateRewardDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Reward })
  remove(@Param('id') id: string) {
    return this.rewardsService.remove(id);
  }
}
