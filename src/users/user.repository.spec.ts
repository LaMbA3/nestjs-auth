import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';

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

  describe('createUser', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('successfuly creates user', () => {
      save.mockResolvedValue(true);
      return expect(
        userRepository.createUser(mockSignupDto),
      ).resolves.not.toThrow();
    });

    

  
  describe('findUser', () => {
    const user = { email: 'test@test.com', password: 'test123', role: 3 };
    beforeEach(() => {
      userRepository.findOne = jest.fn();
      userRepository.validatePassword = jest.fn();
    });

    it('returns user if found and valid', async () => {
      userRepository.findOne.mockResolvedValue(user);
      expect(await userRepository.findUser(mockSignupDto)).toMatchObject(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        email: user.email,
      });
    });

    

    it('returns null if user not found', async () => {
      userRepository.findOne.mockResolvedValue(undefined);
      expect(await userRepository.findUser(mockSignupDto)).toBe(null);
    });
    });
  });
});
