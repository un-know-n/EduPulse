import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../prisma.service';
import { VerificationService } from '../verification/verification.service';
import { AccountService } from '../account/account.service';
import { CloudinaryService } from '../../common/modules/cloudinary/cloudinary.service';

@Module({
  providers: [
    AuthService,
    UserService,
    PrismaService,
    VerificationService,
    AccountService,
    CloudinaryService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
