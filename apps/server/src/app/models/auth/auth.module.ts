import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [AuthService, UserService, PrismaService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
