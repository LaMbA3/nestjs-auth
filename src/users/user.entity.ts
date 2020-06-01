import { Restourant } from './../restourants/restourant.entity';
import { UserRestourant } from '../entities/UserRestourant.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common';

export enum UserRole {
  ADMIN = 1,
  OWNER = 2,
  MOD = 3,
  WAITER = 4,
  KITCHEN = 5,
}

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('enum', {
    // name: 'UserRole',
    enum: UserRole,
    default: UserRole.MOD, // security fault?
  })
  role: UserRole;


  @OneToMany(()=>UserRestourant, UR=>UR.user)
  restourants: Restourant[];

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
