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
    const exitstingEnrollment =
      await this.prismaService.usersAssignedToCourse.findFirst({
        where: { userId, courseId },
      });
    if (exitstingEnrollment)
      throw new BadRequestException('Ви вже зареєстровані на даний курс');

    const isAuthor = await this.checkForCreator(userId, courseId);
    if (isAuthor)
      throw new BadRequestException(
        'Автор курсу не може приєднатися до курсу, який він створив',
      );

    const expireTime = await this.convertTimeToPass(courseId);

    const [enrollment] = await this.prismaService.$transaction([
      this.prismaService.usersAssignedToCourse.create({
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
      }),
      this.prismaService.course.update({
        where: {
          id: courseId,
        },
        data: {
          numberOfPeopleEnrolled: {
            increment: 1,
          },
        },
      }),
    ]);

    return enrollment;
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
        'Ви не можете видалити запис про реєстрацію на курс, не будучи автором курсу',
      );

    const [deletedEnrollment] = await this.prismaService.$transaction([
      this.prismaService.usersAssignedToCourse.delete({
        where: { id },
      }),
      this.prismaService.course.update({
        where: {
          id: id,
        },
        data: {
          numberOfPeopleEnrolled: {
            decrement: 1,
          },
        },
      }),
    ]);

    return deletedEnrollment;
  }

  async convertTimeToPass(courseId: string) {
    const course = await this.courseService.findOne(courseId);

    if (course.timeToPass)
      return moment().utc(true).add(course.timeToPass, 'seconds').toISOString();
    else throw new BadRequestException('Курс не має терміну дії');
  }

  async checkForCreator(userId: string, courseId: string) {
    const course = await this.courseService.findOne(courseId);

    return userId === course.creatorId;
  }

  async getCertificates(userId: string) {
    const completedCourses =
      await this.prismaService.usersAssignedToCourse.findMany({
        where: {
          userId,
          isCompleted: true,
        },
        select: {
          course: {
            select: {
              title: true,
              user: {
                select: {
                  name: true,
                },
              },
              sections: { select: { test: true } },
            },
          },
        },
      });

    return completedCourses.map(({ course }) => ({
      author: course.user.name,
      title: course.title,
      mark: 100,
    }));
  }

  findUserEnrollments(userId: string) {
    return this.prismaService.usersAssignedToCourse.findMany({
      where: {
        userId,
      },
      include: {
        course: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                emailVerified: true,
                name: true,
                role: true,
                image: true,
              },
            },
            sections: {
              include: {
                lectures: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const enrollment =
      await this.prismaService.usersAssignedToCourse.findUnique({
        where: { id },
      });
    if (!enrollment)
      throw new BadRequestException(
        'Немає реєстрації з вказаним ідентифікатором',
      );
    return enrollment;
  }
}
