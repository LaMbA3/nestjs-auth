// import { WorkoutExercise } from 'src/entities/workoutExercise.entity';
import { Repository, EntityRepository } from 'typeorm';
import { Workout } from './workout.entity';
import { WorkoutExercise } from 'src/entities/workoutExercise.entity';



@EntityRepository(Workout)
export class WorkoutRepository extends Repository<Workout>{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async createWorkout(data, user){
        const workout=this.create();

        workout.name = data.name;

        await workout.save();

        console.log(workout);
        this.addExercise(workout, data.exercises);

        return workout;
        
    }

    async addExercise(workout,exercises){
        for(const exercise of exercises){

            const we = new WorkoutExercise();

            we.exerciseId = exercise.id;
            we.sets = exercise.sets;
            we.reps = exercise.reps;
            we.workout = workout;

            await we.save()
            console.log(we);
        }
    }

    getAll(query){
        return this.find(query);
    }

    // getWorkout(id){
    //     WorkoutExercise.find()
    //     return this.findOne(id);
    // }
}