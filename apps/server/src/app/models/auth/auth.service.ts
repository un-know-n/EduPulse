import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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
import { AccountService } from '../account/account.service';
import { User } from '@prisma/client';

export const EXPIRE_TIME = 24 * 60 * 60 * 1000; // 24 hours

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private verificationService: VerificationService,
    private accountService: AccountService,
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

  async checkIfOAuth(userId: string) {
    const isOAuthAccount = await this.accountService.findByUserId(userId);
    if (isOAuthAccount && isOAuthAccount.type === 'oauth')
      throw new BadRequestException(
        'Немає користувачів із такою електронною адресою!',
      );
  }

  async generateTokens(user: Omit<User, 'password'>) {
    const payload = {
      sub: user.email,
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.TOKEN_REFRESH,
    });
    const expiresIn = moment()
      .utc(true)
      .add(EXPIRE_TIME, 'milliseconds')
      .unix(); //.toDate(); //new Date().setTime(new Date().getTime() + EXPIRE_TIME)

    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }

  async signUp(dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    const tokens = await this.generateTokens(user);

    const account = await this.accountService.linkAccount(user.id, {
      ...tokens,
      expiresAt: tokens.expiresIn,
    });

    if (user && account) return user;
    throw new InternalServerErrorException(
      'Неочікувана помилка при створенні облікового запису!',
    );
  }

  async signIn(dto: SignInDto) {
    const user = await this.validateUser(dto);

    await this.checkIfOAuth(user.id);

    const tokens = await this.generateTokens(user);
    await this.accountService.updateTokens(user.id, {
      ...tokens,
      expiresAt: tokens.expiresIn,
    });

    return {
      user,
      backendTokens: tokens,
    };
  }

  async refreshToken(user: User) {
    const tokens = await this.generateTokens(user);
    await this.accountService.updateTokens(user.id, {
      ...tokens,
      expiresAt: tokens.expiresIn,
    });

    return tokens;
  }

  async emailResetPrompt({ email }: ResetPromptDto) {
    const user = await this.findUser(email);
    await this.checkIfOAuth(user.id);

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
