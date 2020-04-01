import { User } from './user.entity';
import { JwtPayload } from './dto/jwt-payload';
import { AuthSignInDto } from './dto/auth-signin';
import { AuthSignUpDto } from './dto/auth-signup';
import { UserRepository } from './user.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<string> {
    return this.userRepository.signUp(authSignUpDto);
  }

  async signIn(
    authSignInDto: AuthSignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user: User = await this.userRepository.signIn(authSignInDto);
    if (!user) {
      throw new BadRequestException('Email or Password are incorect');
    }

    return await this.generateToken(user);
  }

  async generateToken(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { id, email, role } = user;
    const payload: JwtPayload = { id, email, role };

    const accessToken: string = await this.jwtService.sign(payload);
    const refreshToken: string = await this.jwtService.sign(payload, {
      expiresIn: jwtConfig.refreshTokenExpires,
    });

    return { accessToken, refreshToken };
  }
  async refreshToken(token: string): Promise<any> {
    const user: User = await this.jwtService.verify(token);

    return await this.generateToken(user);
  }
}
