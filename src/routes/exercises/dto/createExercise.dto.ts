import { IsNotEmpty, Length, IsArray, ArrayNotEmpty } from "class-validator";


export class CreateExercise{
    @IsNotEmpty()
    @Length(3,150)
    name:string;

    @IsNotEmpty()
    @Length(20,500)
    description:string;

    @IsArray()
    @ArrayNotEmpty()
    groups:[]

    // muscleGroup: 
}