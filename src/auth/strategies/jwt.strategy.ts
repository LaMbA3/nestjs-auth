import { UserRepository } from '../../users/user.repository';
import { JwtPayload } from './../dto/jwt-payload';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topsecret',
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const user = this.userRepository.findOne({ id });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
