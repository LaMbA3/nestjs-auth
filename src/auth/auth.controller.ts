import { UserRole } from './user.entity';
import { RolesGuard } from './auth.roles.guard';
import { GetUser } from './get-user.decorator';
import { AuthSignInDto } from './dto/auth-signin';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signup';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.signIn(authSignInDto);
  }

  @Post('/refresh-token')
  async refreshToken(@Body() body): Promise<any> {
    return await this.authService.refreshToken(body.refreshToken);
  }

  @Get('test')
  @UseGuards(AuthGuard(), new RolesGuard([UserRole.ADMIN])) // new RolesGuard([UserRole.ADMIN]) in [ ] specify which roles can access this route
  test(@GetUser() user) {
    return 'sasdsa';
  }
}
