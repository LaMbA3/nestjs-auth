import { Group } from './../groups/group.entity';
import { Exercise } from './exercise.entity';
import { Repository, EntityRepository } from 'typeorm';



@EntityRepository(Exercise)
export class ExerciseRepository extends Repository<Exercise>{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async createExercise(data, user){
        const exercise=this.create();

        exercise.name = data.name;
        exercise.description = data.description;
        // exercise.user = user;
        //probably need to query by id and then connect it to exercise, probably better way exists
        const groups =await Group.findByIds(data.groups);
        exercise.groups = groups;
        return exercise.save();
    }
    getAll(query){
        return this.find(query);
    }
}