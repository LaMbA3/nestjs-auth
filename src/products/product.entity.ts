import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Category } from 'src/categories/category.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToMany(type => Category)
  @JoinTable()
  categories: Category[];

  @ManyToOne(
    type => User,
    user => user,
  )
  user: User; //relacija sa userom odnosno sa restoranom
}
