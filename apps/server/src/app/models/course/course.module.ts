import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from '../../common/modules/cloudinary/cloudinary.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService, JwtService, CloudinaryService],
})
export class CourseModule {}
