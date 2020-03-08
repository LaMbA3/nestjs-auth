import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

//manyToMany za proizvod-kategorija 

  @ManyToOne(
    type => User,
    user => user,
  )
  user: User; //ovde treba many to one relacija
}
