import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CourseService } from '../course/course.service';
import { CloudinaryService } from '../../common/modules/cloudinary/cloudinary.service';

@Module({
  controllers: [EnrollmentController],
  providers: [
    EnrollmentService,
    PrismaService,
    JwtService,
    CourseService,
    CloudinaryService,
  ],
})
export class EnrollmentModule {}
