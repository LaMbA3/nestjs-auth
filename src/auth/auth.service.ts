import { User } from './user.entity';
import { JwtPayload } from './dto/jwt-payload';
import { AuthSignInDto } from './dto/auth-signin';
import { AuthSignUpDto } from './dto/auth-signup';
import { UserRepository } from './user.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

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

  async signIn(authSignInDto: AuthSignInDto): Promise<{ accessToken: string }> {
    const user: User = await this.userRepository.signIn(authSignInDto);
    if (!user) {
      throw new BadRequestException('Email or Password are incorect');
    }
    console.log(user);
    const { id, email } = user; //include role later
    const payload: JwtPayload = { id, email };
    const accessToken: string = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
