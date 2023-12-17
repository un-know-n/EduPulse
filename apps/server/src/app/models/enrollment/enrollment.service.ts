import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { PrismaService } from '../../prisma.service';
import moment from 'moment/moment';
import { TeacherRoleGuard } from '../../common/guards/teacher-role.guard';
import { CourseService } from '../course/course.service';
import { TUser } from '../user/user.decorator';

@Injectable()
export class EnrollmentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly courseService: CourseService,
  ) {}

  async create({ userId, courseId }: CreateEnrollmentDto) {
    const isAuthor = await this.checkForCreator(userId, courseId);
    if (isAuthor)
      throw new BadRequestException(
        "The author of the course can't join a course that was created by him",
      );

    const expireTime = await this.convertTimeToPass(courseId);

    return await this.prismaService.usersAssignedToCourse.create({
      data: {
        user: {
          connect: { id: userId },
        },
        course: {
          connect: { id: courseId },
        },
        assignedAt: moment().utc(true).toISOString(),
        expiresAt: expireTime,
      },
    });
  }

  async reset(id: string) {
    const enrollment = await this.findOne(id);
    const expireTime = await this.convertTimeToPass(enrollment.courseId);

    return await this.prismaService.usersAssignedToCourse.update({
      where: {
        id,
      },
      data: {
        assignedAt: moment().utc(true).toISOString(),
        expiresAt: expireTime,
      },
    });
  }

  @UseGuards(TeacherRoleGuard)
  async remove(id: string, user: TUser) {
    const enrollment = await this.findOne(id);
    const isAuthor = await this.checkForCreator(user.id, enrollment.courseId);
    if (!isAuthor)
      throw new BadRequestException(
        "You can't remove enrollment without being an author of the course",
      );

    return this.prismaService.usersAssignedToCourse.delete({
      where: { id },
    });
  }

  async convertTimeToPass(courseId: string) {
    const course = await this.courseService.findOne(courseId);

    if (course.timeToPass)
      return moment().utc(true).add(course.timeToPass, 'seconds').toISOString();
    else throw new BadRequestException('Course has no expiring time!');
  }

  async checkForCreator(userId: string, courseId: string) {
    const course = await this.courseService.findOne(courseId);

    return userId === course.creatorId;
  }

  findAll() {
    return this.prismaService.usersAssignedToCourse.findMany();
  }

  async findOne(id: string) {
    const enrollment =
      await this.prismaService.usersAssignedToCourse.findUnique({
        where: { id },
      });
    if (!enrollment)
      throw new BadRequestException('There is no enrollment with given id!');
    return enrollment;
  }
}
