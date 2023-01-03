import { Test, TestingModule } from '@nestjs/testing';
import { ThumbSnapService } from './thumb-snap.service';

describe('ThumbSnapService', () => {
  let service: ThumbSnapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThumbSnapService],
    }).compile();

    service = module.get<ThumbSnapService>(ThumbSnapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
