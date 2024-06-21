import { Injectable } from '@nestjs/common';
import { CreateCourseCommentDto } from './dto/create-course-comment.dto';
import { UpdateCourseCommentDto } from './dto/update-course-comment.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CourseCommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCourseCommentDto: CreateCourseCommentDto) {
    return this.prismaService.courseComments.create({
      data: createCourseCommentDto,
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  }

  findAllSorted(courseId: string, order: 'asc' | 'desc') {
    return this.prismaService.courseComments.findMany({
      where: { courseId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        course: {
          select: {
            creatorId: true,
          },
        },
      },
      take: 15,
      orderBy: { createdAt: order },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} courseComment`;
  // }

  // update(id: number, updateCourseCommentDto: UpdateCourseCommentDto) {
  //   return `This action updates a #${id} courseComment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} courseComment`;
  // }
}
