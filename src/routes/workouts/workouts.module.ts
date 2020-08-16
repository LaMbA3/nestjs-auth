import { WorkoutRepository } from './workout.repository';
import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Workout } from './workout.entity';

@Module({
  imports:[TypeOrmModule.forFeature([WorkoutRepository])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService]
})
export class WorkoutsModule {}
