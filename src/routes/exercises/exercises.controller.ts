import { queryParser } from '../../utils/queryParser.decorator';
// import { ORMQuery, makeQuery } from './../decorators/queryParser.decorator';
import { ExercisesService } from './exercises.service';
import { CreateExercise } from './dto/createExercise.dto';
import { Controller, Get, Post, Delete, Body, ValidationPipe, UsePipes, InternalServerErrorException, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/routes/auth/auth.roles.guard';
import { UserRole } from 'src/users/user.entity';
import { User } from 'src/decorators/get-user.decorator';

@Controller('exercises')
export class ExercisesController {
  constructor(private exerciseService:ExercisesService){}
  @Post('')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard(), new RolesGuard([UserRole.USER,UserRole.ADMIN,UserRole.MOD]))
  async createExercise(@User() user,@Body() data: CreateExercise) {
  
    try{
      return await this.exerciseService.createExercise(data, user);
    }catch(err){
      throw new InternalServerErrorException(err);
    }
  }
  @Get()
  getAllexercises(@Query() queries){
    const query = queryParser.build(queries);
    const response = this.exerciseService.getAllexercises(query);
    return response;
  }
  // @Delete()
  // deleteexercises() {}

  @Get('test')
  test() {
    return 'working';
  }
}
