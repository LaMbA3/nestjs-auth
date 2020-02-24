import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

export enum UserRole {
  ADMIN = 'ADMIN',
  MOD = 'MODERATOR',
  WAITER = 'WAITER',
  KITCHEN = 'KITCHEN',
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

  // @Column('enum', {
  //   name: 'UserRole',
  //   enum: UserRole,
  // })
  // role: UserRole;
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
