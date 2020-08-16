import { BaseEntity, PrimaryGeneratedColumn,Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { WorkoutExercise } from "src/entities/workoutExercise.entity";
import { User } from "src/users/user.entity";

@Entity()
export class Workout extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column({nullable: true})
    details: string;


    @OneToMany(()=> WorkoutExercise, exercise => exercise.workout)
    exercises: WorkoutExercise[];

    @ManyToOne(() => User, user => user.workouts)
    creator: User;
}   