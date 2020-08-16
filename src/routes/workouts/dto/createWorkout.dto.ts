import { IsNotEmpty } from "class-validator";



export class CreateWorkoutDto{
    @IsNotEmpty()
    name:string;

    exercises: [];
}