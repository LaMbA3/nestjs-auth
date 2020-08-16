import { IsNotEmpty, Length } from "class-validator";


export class CreateGroup{
    @IsNotEmpty()
    @Length(3,150)
    name:string;

    

    // muscleGroup: 
}