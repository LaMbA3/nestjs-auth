import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/user.repository';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';

const mockSignupDto = {
  email: 'test@test.com',
  password: 'tests123',
};

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

  describe('signIn function', () => {
    it('should return accessToken string', async () => {
      const token = 'sometokenval';
      mockUserRepository.signIn = jest.fn().mockResolvedValue(true);
      mockJwtService.sign = jest.fn().mockResolvedValue(token);
      await expect(await service.signIn(mockSignupDto)).toStrictEqual({
        accessToken: token,
        refreshToken: token,
      });
    });

    it('should throw error BadRequest if no user or bad password', async () => {
      expect(1).toBe(1);
      mockUserRepository.signIn = jest.fn().mockResolvedValue(false);
      mockJwtService.sign = jest.fn().mockResolvedValue(undefined);

      await expect(service.signIn(mockSignupDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(mockUserRepository.signIn(mockSignupDto)).resolves.toBe(
        false,
      );
      expect(mockJwtService.sign).not.toHaveBeenCalled();
    });
  });
});
