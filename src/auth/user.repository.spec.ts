import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

const mockSignupDto = {
  email: 'test@test.com',
  password: 'tests123',
};

// describe('Ensure tests fail when they are supposed to', () => {
//   it('Should fail because 1 is not 0', () => {
//     expect(1).toBe(0);
//   });
// });

describe('UserRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('successfuly signsUp user', () => {
      save.mockResolvedValue(true);
      return expect(
        userRepository.signUp(mockSignupDto),
      ).resolves.not.toThrow();
    });

    it('Throws conflict exception if user exists', () => {
      save.mockRejectedValue({ code: 23505 });
      return expect(userRepository.signUp(mockSignupDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('Throws internal server eror for unhandeled codes', () => {
      save.mockRejectedValue({ code: 123 }); //unhandeled
      return expect(userRepository.signUp(mockSignupDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('signIn', () => {
    const user = { email: 'test@test.com', password: 'test123' };
    beforeEach(() => {
      userRepository.findOne = jest.fn();
      userRepository.validatePassword = jest.fn();
    });

    it('returns user if found and valid', async () => {
      userRepository.findOne.mockResolvedValue(user);
      userRepository.validatePassword.mockResolvedValue(true);
      expect(await userRepository.signIn(mockSignupDto)).toMatchObject(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        email: user.email,
      });
    });

    it('returns null if user not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      userRepository.validatePassword.mockResolvedValue(true);
      expect(await userRepository.signIn(mockSignupDto)).toBe(null);
      expect(userRepository.validatePassword).not.toHaveBeenCalled();
    });

    it('returns null if wrong password', async () => {
      userRepository.findOne.mockResolvedValue(user);
      userRepository.validatePassword.mockResolvedValue(false);
      expect(await userRepository.signIn(mockSignupDto)).toBe(null);
      expect(userRepository.validatePassword).toHaveBeenCalledWith(
        mockSignupDto.password,
        user.password,
      );
    });
  });
});
