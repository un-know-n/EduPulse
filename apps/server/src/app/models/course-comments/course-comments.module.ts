import { Module } from '@nestjs/common';
import { CourseCommentsService } from './course-comments.service';
import { CourseCommentsGateway } from './course-comments.gateway';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [CourseCommentsGateway, CourseCommentsService, PrismaService],
})
export class CourseCommentsModule {}
