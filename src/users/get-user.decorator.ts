import { User } from './user.entity';
import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (_data, req): User => {
    return req.user;
  },
);
