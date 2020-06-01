import { Restourant } from '../restourants/restourant.entity';
import { Entity, BaseEntity, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";




@Entity()
export class UserRestourant extends BaseEntity{
    @PrimaryColumn()
    userId: number;
    
    @PrimaryColumn()
    restourantId: number;

    @ManyToOne(()=>User, user=> user.restourants)
    user: User;

    @ManyToOne(()=> Restourant, restourant => restourant.user)
    restourant: Restourant;
}