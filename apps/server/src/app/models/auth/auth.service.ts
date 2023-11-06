import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/signin.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ResetVerifyDto } from './dto/reset.verify.dto';
import { VerificationService } from '../verification/verification.service';
import { ResetPromptDto } from './dto/reset.prompt.dto';
import moment from 'moment/moment';

const EXPIRE_TIME = 24 * 60 * 60 * 1000; // 24 hours

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private verificationService: VerificationService,
  ) {}

  async validateUser(dto: SignInDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user && (await compare(dto.password, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }

    throw new UnauthorizedException(
      'Неправильна електронна адреса або пароль!',
    );
  }

  async findUser(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user)
      throw new BadRequestException(
        'Немає користувачів із такою електронною адресою!',
      );
    return user;
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
        expiresIn: moment().utc(true).add(EXPIRE_TIME, 'milliseconds').toDate(), //new Date().setTime(new Date().getTime() + EXPIRE_TIME),
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
      expiresIn: moment().utc(true).add(EXPIRE_TIME, 'milliseconds').toDate(), //new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  async emailResetPrompt({ email }: ResetPromptDto) {
    const user = await this.findUser(email);

    return await this.verificationService.createToken(user);
  }

  async resetVerify({ email, token }: ResetVerifyDto) {
    const user = await this.findUser(email);

    try {
      await this.verificationService.verifyToken(user.id, token);
    } catch (e) {
      throw new BadRequestException(e.response);
    }

    return true;
  }

  async reset({ password, email }: SignInDto) {
    const user = await this.findUser(email);

    await this.userService.update(user.id, { password });
  }
}
