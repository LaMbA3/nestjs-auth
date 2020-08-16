// import { Group } from '../groups/group.entity';
// import { User } from '../../users/user.entity';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Group } from '../groups/group.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.exercises)
  creator: User;

  @ManyToMany(()=> Group, groups=> groups.exercises)
  @JoinTable()
  groups: Group[];
}
