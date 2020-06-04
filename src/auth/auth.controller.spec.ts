import { AuthSignUpDto } from './dto/auth-signup';
import { AuthSignInDto } from './dto/auth-signin';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ForbiddenException, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';

describe('Auth Controller', () => {
  let controller: AuthController;
  let mockAuthService;
  const mockSigninDto = {
    email: 'test@test.com',
    password: 'tests123',
  };
  const mockSignupDto = {
    email: 'test@test.com',
    password: 'tests123',
    role:1
  };
  
  beforeEach(async () => {
    mockAuthService = {} as AuthService;

    controller = new AuthController(mockAuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signin route', () => {
    const user = { email: 'test@test.com', password: 'test123', role: 3 };
    it('should call authService signIn', () => {
      mockAuthService.signIn = jest.fn();
      expect(mockAuthService.signIn).toHaveBeenCalledTimes(0);
      controller.signIn({} as AuthSignInDto);
      expect(mockAuthService.signIn).toHaveBeenCalledTimes(1);
    });

    it('throws exeption if user is not allowed to sign in to service', () => {
      mockAuthService.signIn = jest.fn();
      mockAuthService.signIn.mockResolvedValue(user);
      mockAuthService.validatePassword = jest.fn();
      mockAuthService.validatePassword.mockResolvedValue(true);
      return expect(controller.signIn(mockSigninDto,[1,2])).rejects.toThrow(ForbiddenException);
    });
    it('returns bad request if wrong password',  () => {
      mockAuthService.signIn = jest.fn();
      mockAuthService.signIn.mockResolvedValue(user);
      mockAuthService.validatePassword = jest.fn().mockResolvedValue(false);
      return expect( controller.signIn(mockSigninDto)).rejects.toThrow(BadRequestException);
  });

  describe('signup route', () => {
    it('should call authService signup', () => {
      mockAuthService.signUp = jest.fn();
      expect(mockAuthService.signUp).toHaveBeenCalledTimes(0);
      controller.signUp({} as AuthSignUpDto);
      expect(mockAuthService.signUp).toHaveBeenCalledTimes(1);
    });

      it('Throws internal server eror for unhandeled codes', () => {
      mockAuthService.signUp = jest.fn();
      mockAuthService.signUp.mockRejectedValue({ code: 123 }); //unhandeled
      return expect(controller.signUp(mockSignupDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

    it('Throws conflict exception if user exists', () => {
      mockAuthService.signUp = jest.fn();
      mockAuthService.signUp.mockRejectedValue({ code: 23505 });
      return expect(controller.signUp(mockSignupDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
