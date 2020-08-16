import { ExerciseRepository } from './exercise.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { queryParser } from 'src/decorators/queryParser.decorator';

@Injectable()
export class ExercisesService {
    constructor(
        @InjectRepository(ExerciseRepository)
        private exerciseRepository
    ){}
    createExercise(data,user){
        return this.exerciseRepository.createExercise(data, user);
    }

    getAllexercises(queries){
        return this.exerciseRepository.getAll(queries);
    }
}
