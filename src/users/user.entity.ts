import { Workout } from 'src/routes/workouts/workout.entity';
// import { Exercise } from '../exercises/exercise.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Unique,
  OneToMany,
  // OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common';
import { Exercise } from 'src/routes/exercises/exercise.entity';
// import { Exercise } from 'src/routes/exercises/exercise.entity';

export enum UserRole {
  ADMIN = 1,
  MOD = 2,
  USER = 3,
}

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({select:false})
  password: string;

  @Column('enum', {
    // name: 'UserRole',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(()=> Exercise, exercise=> exercise.creator)
  exercises: Exercise[];

  @OneToMany(()=> Workout, workout=> workout.creator)
  workouts: Workout[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
