import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService) {}

  @Post('register')
  async create(@Body() RegisterAuthDto: RegisterAuthDto) {
    RegisterAuthDto.email = RegisterAuthDto.email.toLowerCase();
    const user = await this.userService.create(RegisterAuthDto);
    if(!user){
      throw new BadRequestException('Unable to register');
    }
    return this.authService.login({
      email: user.email,
      password: RegisterAuthDto.password,
    });
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

}
