import { Exercise } from 'src/routes/exercises/exercise.entity';

import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToMany } from "typeorm";

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  name: string;

  @ManyToMany(()=> Exercise, exercise=> exercise.groups)
  exercises: Exercise[];
}