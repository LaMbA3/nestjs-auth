import { Restourant } from './../restourants/restourant.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"



@Entity()
export class Company extends BaseEntity {

    @PrimaryGeneratedColumn()
    CompanyID:number;
    
    @Column()
    name:string;

    @OneToMany(()=> Restourant, restourant=>restourant.company)
    restourants: Restourant[];
}