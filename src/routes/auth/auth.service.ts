import { User } from '../../users/user.entity';
import { JwtPayload } from './dto/jwt-payload';
import { AuthSignInDto } from './dto/auth-signin';
import { AuthSignUpDto } from './dto/auth-signup';
import { UserRepository } from '../../users/user.repository';
import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';


import * as bcrypt from 'bcryptjs';


export type Token = { accessToken: string; refreshToken: string };

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authSignUpDto: AuthSignUpDto): Promise<User> {
     return this.userRepository.createUser(authSignUpDto);
  }

  async signIn(
    authSignInDto: AuthSignInDto
  ): Promise<User> {
    return await this.userRepository.findUser(authSignInDto);
  }

  async generateToken(
    user: User,
  ): Promise<Token> {
    const { id, email, role } = user;
    const payload: JwtPayload = { id, email, role };

    const accessToken: string = await this.jwtService.sign(payload);
    const refreshToken: string = await this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
    });

    return { accessToken, refreshToken };
  }
  async verifyToken(token: string): Promise<User> {
    return await this.jwtService.verify(token);
  }
  async validatePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    try{
      return await bcrypt.compare(password, hash);
    }
    catch(err){
      console.error(err);
      return err;
    }
  }
}
