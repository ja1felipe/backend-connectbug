import { Test, TestingModule } from '@nestjs/testing';
import { ScreenshotsController } from './screenshots.controller';
import { ScreenshotsService } from './screenshots.service';

describe('ScreenshotsController', () => {
  let controller: ScreenshotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScreenshotsController],
      providers: [ScreenshotsService],
    }).compile();

    controller = module.get<ScreenshotsController>(ScreenshotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
