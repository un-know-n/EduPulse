import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/signin.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';

const EXPIRE_TIME = 20 * 1000; // 20 seconds

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(dto: SignInDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user && (await compare(dto.password, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }

    throw new UnauthorizedException('Wrong email or password!');
  }

  async signUp(dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  async signIn(dto: SignInDto) {
    const user = await this.validateUser(dto);

    const payload = {
      sub: user.email,
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: EXPIRE_TIME,
          secret: process.env.TOKEN_SECRET,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.TOKEN_REFRESH,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async refreshToken(user: any) {
    const payload = {
      sub: user.email,
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: EXPIRE_TIME,
        secret: process.env.TOKEN_SECRET,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.TOKEN_REFRESH,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
