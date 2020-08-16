import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesService } from './exercises.service';
import { ExerciseRepository } from './exercise.repository';

describe('ExercisesService', () => {
  let service: ExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[ExerciseRepository],
      providers: [ExercisesService],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
