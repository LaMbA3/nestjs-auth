import { AuthSignUpDto } from './dto/auth-signup';
import { AuthSignInDto } from './dto/auth-signin';
import { AuthService } from './auth.service';
// import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('Auth Controller', () => {
  let controller: AuthController;
  let mockAuthService;
  beforeEach(async () => {
    mockAuthService = {} as AuthService;

    controller = new AuthController(mockAuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signin route', () => {
    it('should call authService signIn', () => {
      mockAuthService.signIn = jest.fn();
      expect(mockAuthService.signIn).toHaveBeenCalledTimes(0);
      controller.signIn({} as AuthSignInDto);
      expect(mockAuthService.signIn).toHaveBeenCalledTimes(1);
    });
  });
  describe('signup route', () => {
    it('should call authService signup', () => {
      mockAuthService.signUp = jest.fn();
      expect(mockAuthService.signUp).toHaveBeenCalledTimes(0);
      controller.signUp({} as AuthSignUpDto);
      expect(mockAuthService.signUp).toHaveBeenCalledTimes(1);
    });
  });
});
