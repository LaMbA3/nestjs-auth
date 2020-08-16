import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/createWorkout.dto';
import { Controller, Post, Body, UsePipes, ValidationPipe, InternalServerErrorException, Query, Get } from '@nestjs/common';

@Controller('workouts')
export class WorkoutsController {
    constructor(private workoutService:WorkoutsService){}
    @Post()
    @UsePipes(ValidationPipe)
    async createWorkout(@Body() data: CreateWorkoutDto){
        
        try{
            return await this.workoutService.createWorkout(data);
            
        }catch(err){
            throw new InternalServerErrorException(err);
        }
    }

    @Get()
    async getAllWorkouts(@Query() query){
        try{
            const workouts = this.workoutService.getAll(query);
            return workouts;
        }catch(err){
            throw new InternalServerErrorException(err);
        }
    }
}
