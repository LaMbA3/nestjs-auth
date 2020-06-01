import { Company } from './../companies/company.entity';
import { UserRestourant } from '../entities/UserRestourant.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Restourant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(()=> Company, company=>company.restourants)
  company:Company;

  @OneToMany(()=>UserRestourant, UR => UR.restourant)
  user: User;
}
