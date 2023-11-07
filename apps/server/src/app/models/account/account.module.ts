import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [AccountService, PrismaService],
})
export class AccountModule {}
