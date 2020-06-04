import { AuthSignInDto } from '../auth/dto/auth-signin';
import { AuthSignUpDto } from '../auth/dto/auth-signup';
import { User } from './user.entity';
import { Repository, EntityRepository } from 'typeorm';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authSignUpDto: AuthSignUpDto): Promise<User> {
    const { email, password, role } = authSignUpDto;

    const user = this.create();
    user.email = email;
    user.password = password;
    user.role = role;
    
    return user.save();
  }

  async findUser(authSignInDto: AuthSignInDto): Promise<User> {
    const { email } = authSignInDto;

    const user = await this.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }
}
