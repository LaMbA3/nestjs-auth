// import { GetUser } from './get-user.decorator';
import { AuthSignInDto } from './dto/auth-signin';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signup';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authSignUpDto: AuthSignUpDto) {
    return this.authService.signUp(authSignUpDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  signIn(
    @Body() authSignInDto: AuthSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authSignInDto);
  }

  // @Get('test')
  // @UseGuards(AuthGuard())
  // test(@GetUser() user) {
  //   return user;
  // }
}
