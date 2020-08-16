import { Test, TestingModule } from '@nestjs/testing';
import { DietController } from './diet.controller';

describe('Diet Controller', () => {
  let controller: DietController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DietController],
    }).compile();

    controller = module.get<DietController>(DietController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
