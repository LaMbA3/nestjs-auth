import { IsNotEmpty, IsEmail } from 'class-validator';

export class AuthSignUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  role: number;

  @IsNotEmpty()
  password: string;
}
