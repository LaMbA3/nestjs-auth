import { User } from './../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/user.repository';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';

// const mockSignupDto = {
//   email: 'test@test.com',
//   password: 'tests123',
// };
const user = { email: 'test@test.com', password: 'test123', role: 3 } as User;

describe('AuthService', () => {
  let service: AuthService;

  let mockUserRepository: UserRepository;
  let mockJwtService: JwtService;
  beforeEach(async () => {
    mockUserRepository = {} as UserRepository;
    // mockUserRepository = Object.assign(mockUserRepository, {
    //   signIn: jest.fn(),
    // });
    mockJwtService = new JwtService({});
    service = new AuthService(mockUserRepository, mockJwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('genereateToken function', () => {
    it('should return accessToken string', async () => {
      const token = 'sometokenval';
      mockJwtService.sign = jest.fn().mockResolvedValue(token);
      await expect(await service.generateToken(user)).toStrictEqual({
        accessToken: token,
        refreshToken: token,
      });
    });
  });

  // describe('ValidatePassword function', () => {
    
  // });

});
