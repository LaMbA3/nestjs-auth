import { AuthSignInDto } from './dto/auth-signin';
import { AuthSignUpDto } from './dto/auth-signup';
import { User } from './user.entity';
import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authSignUpDto: AuthSignUpDto): Promise<string> {
    const { email, password } = authSignUpDto;

    const user = new User();
    user.email = email;
    user.password = password;

    try {
      await user.save();
    } catch (err) {
      if (err.code == 23505) throw new ConflictException('User already exists'); //23505 is error code if user alreay exists in postgres
      throw new InternalServerErrorException(err);
    }
    return 'User Created';
  }

  async signIn(authSignInDto: AuthSignInDto): Promise<User> {
    const { email, password } = authSignInDto;

    const user = await this.findOne({ email });

    if (user && (await this.validatePassword(password, user.password))) {
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