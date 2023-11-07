import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { VerificationService } from '../verification/verification.service';
import { AccountService } from '../account/account.service';

@Module({
  providers: [
    AuthService,
    UserService,
    PrismaService,
    JwtService,
    VerificationService,
    AccountService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
