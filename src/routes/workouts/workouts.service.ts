import { WorkoutRepository } from './workout.repository';
import { queryParser } from '../../utils/queryParser.decorator';
import { CreateWorkoutDto } from './dto/createWorkout.dto';
import { Injectable } from '@nestjs/common';


@Injectable()
export class WorkoutsService {
    constructor(private wr:WorkoutRepository){}
    createWorkout(data: CreateWorkoutDto){
        return this.wr.createWorkout(data,null);

    }


    getAll(queries){
        const query  = queryParser.build(queries);
        return this.wr.getAll(query);
    }
}
