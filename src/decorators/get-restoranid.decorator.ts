import { createParamDecorator } from '@nestjs/common';

export const GetRestoran = createParamDecorator((_data, req) => {
  return req.query['restoranId'];
});
