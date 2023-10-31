import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [VerificationService, PrismaService],
})
export class VerificationModule {}
