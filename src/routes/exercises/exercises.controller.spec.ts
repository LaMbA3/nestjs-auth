import { AuthModule } from '../auth/auth.module';
import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesController } from './exercises.controller';

describe('Products Controller', () => {
  let controller: ExercisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[AuthModule],
      controllers: [ExercisesController],
    }).compile();

    controller = module.get<ExercisesController>(ExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
