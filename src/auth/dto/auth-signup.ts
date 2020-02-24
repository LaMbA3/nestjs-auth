import { IsNotEmpty, IsEmail } from 'class-validator';

export class AuthSignUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
