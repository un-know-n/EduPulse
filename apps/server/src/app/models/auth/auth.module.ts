import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../prisma.service';
import { VerificationService } from '../verification/verification.service';
import { AccountService } from '../account/account.service';

@Module({
  providers: [
    AuthService,
    UserService,
    PrismaService,
    VerificationService,
    AccountService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
