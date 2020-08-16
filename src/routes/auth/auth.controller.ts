// import { User } from './../users/user.entity';
import { UserRole } from '../../users/user.entity';
import { RolesGuard } from './auth.roles.guard';
import { User } from '../../decorators/get-user.decorator';
import { AuthSignInDto } from './dto/auth-signin';
import { AuthService, Token } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signup';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
  InternalServerErrorException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() authSignUpDto: AuthSignUpDto):Promise<string> {

    try {
      await this.authService.signUp(authSignUpDto);
    }catch(err){
      if (err.code == 23505) {
        throw new ConflictException('User already exists'); //23505 is error code if user alreay exists in postgres
      }
      throw new InternalServerErrorException(err);  
    }

    return "User Created";
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  async signIn(
    @Body() authSignInDto: AuthSignInDto,
    allowedRoles=[]
  ): Promise<Token> {

    const user = await this.authService.signIn(authSignInDto);
    if (user && (await this.authService.validatePassword(authSignInDto.password, user.password))) {

      if(allowedRoles.length > 0 && !allowedRoles.includes(user.role)){
        throw new ForbiddenException();
      }
      
      return await this.authService.generateToken(user);
    }
      throw new BadRequestException('Email or Password are incorrect');
  }

  @Post('/refresh-token')
  async refreshToken(@Body() body): Promise<Token> {
    const user = await this.authService.verifyToken(body.refreshToken);
    return await this.authService.generateToken(user);
  }

  @Get('test')
  @UseGuards(AuthGuard(), new RolesGuard([UserRole.ADMIN])) // new RolesGuard([UserRole.ADMIN]) in [ ] specify which roles can access this route
  test(@User() user) {
    console.log(user);
    
    return 'sasdsa';
  }
}
