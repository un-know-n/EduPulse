import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [SectionController],
  providers: [SectionService, PrismaService, JwtService],
})
export class SectionModule {}
