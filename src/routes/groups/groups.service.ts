import { Group } from './group.entity';
import { CreateGroup } from './dto/createGroup.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupsService {
    createGroup(data: CreateGroup){
        const group= new Group();

        group.name = data.name;

        return group.save();
    }
    getAll(query){
        return Group.find(query);
    }
}
