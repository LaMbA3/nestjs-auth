import { Workout } from 'src/routes/workouts/workout.entity';
import { Exercise } from 'src/routes/exercises/exercise.entity';
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";




@Entity()
export class WorkoutExercise extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable: true})
    reps: number;
    
    @Column({nullable: true})
    sets: number;

    @Column({nullable: true})
    seconds: number;

    @Column({type: "int", nullable: true})
    workoutId: number;

    @Column({type: "int", nullable: true})
    exerciseId: number;

    @ManyToOne(()=>Exercise)
    @JoinColumn()
    exercise: Exercise;

    @ManyToOne(()=>Workout, w=> w.exercises)
    @JoinColumn()
    workout: Workout;
}