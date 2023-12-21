import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [LectureController],
  providers: [LectureService, PrismaService],
})
export class LectureModule {}
