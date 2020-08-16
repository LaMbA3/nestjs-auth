import { queryParser } from 'src/utils/queryParser.decorator';
import { CreateGroup } from './dto/createGroup.dto';
import { Controller, Post, UsePipes, ValidationPipe, UseGuards, InternalServerErrorException, Get, Body, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/routes/auth/auth.roles.guard';
import { UserRole } from 'src/users/user.entity';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
    constructor(private groupsService:GroupsService){}

    @Post('')
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard(), new RolesGuard([UserRole.ADMIN]))
    async createGroup(@Body() data: CreateGroup){
        try {
            const group = await this.groupsService.createGroup(data);
                        
            return group;
        }catch(err){
            throw new InternalServerErrorException(err);
        }
    }
    @Get()
    async getAllGroups(@Query() queries){
        const query = queryParser.build(queries);
        try{
            const groups = await this.groupsService.getAll(query);
            return groups;
        }catch(err){
            throw new InternalServerErrorException(err);
        }
    }
}
