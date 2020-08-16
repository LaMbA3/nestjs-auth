import { AuthModule } from '../auth/auth.module';
import { ExerciseRepository } from './exercise.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesController } from './exercises.controller';
import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';

@Module({
   imports:[AuthModule,
  TypeOrmModule.forFeature([ExerciseRepository])
],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
