import { AuthSignInDto } from '../auth/dto/auth-signin';
import { AuthSignUpDto } from '../auth/dto/auth-signup';
import { User } from './user.entity';
import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {
  InternalServerErrorException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authSignUpDto: AuthSignUpDto): Promise<string> {
    const { email, password, role } = authSignUpDto;

    const user = this.create();
    user.email = email;
    user.password = password;
    user.role = role;
    

    try {
      await user.save();
    } catch (err) {
      if (err.code == 23505) {
        throw new ConflictException('User already exists'); //23505 is error code if user alreay exists in postgres
      }
      throw new InternalServerErrorException(err);
    }
    return 'User Created';
  }

  async signIn(authSignInDto: AuthSignInDto,allowedRoles=[]): Promise<User> {
    const { email, password } = authSignInDto;

    const user = await this.findOne({ email });

    if (user && (await this.validatePassword(password, user.password))) {

      if(allowedRoles.length > 0 && !allowedRoles.includes(user.role)){
        throw new ForbiddenException();
      }
      
      return user;
    }
    return null;
  }
  private async validatePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(password, hash);

    return match;
  }
}
