import { Reward } from '@/rewards/entities/reward.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateRewardDto extends OmitType(Reward, [
  'id',
  'created_at',
  'updated_at',
]) {}
