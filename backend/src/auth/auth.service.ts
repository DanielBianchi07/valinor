import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userRepository.findOne({
      where: {email: loginAuthDto.email},
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    if (!bcrypt.compareSync(loginAuthDto.password, user.password)) {
      throw new UnauthorizedException('Inválid login details');
    }

    const payload = { email: user.email, id: user.id };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
