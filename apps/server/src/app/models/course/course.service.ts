// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import 'multer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../../prisma.service';
import { CloudinaryService } from '../../common/modules/cloudinary/cloudinary.service';
import moment from 'moment';

@Injectable()
export class CourseService {
  constructor(
    private prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async deletePreviousCourseImage(id: string) {
    const course = await this.findOne(id);

    if (course.image) {
      // The main concept is ../asdasd.png (path) -> asdasd.png (image name) -> asdasd (id)
      const fullImageName = course.image.split('/').slice(-1)[0];
      const imageId = fullImageName.substring(0, fullImageName.indexOf('.'));

      return () => this.cloudinaryService.deleteImage(imageId);
    }
    return () => Promise.resolve();
  }

  async create(createCourseDto: CreateCourseDto, imageUrl?: string) {
    return await this.prismaService.course.create({
      data: {
        ...createCourseDto,
        image: imageUrl ?? '',
      },
    });
  }

  async findAll(
    userId: string,
    searchString?: string,
    orderBy?: 'asc' | 'desc',
  ) {
    const or = searchString
      ? {
          OR: [{ title: { contains: searchString ?? '' } }],
        }
      : {};
    const sortOrder = orderBy ?? 'asc';

    return await this.prismaService.course.findMany({
      where: {
        ...or,
      },
      orderBy: {
        createdAt: sortOrder,
      },
      include: {
        UsersAssignedToCourse: {
          where: {
            userId,
          },
        },
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
            tests: true,
          },
        },
      },
    });
  }

  async searchCourses(
    userId: string,
    title: string,
    categoryIds?: number[],
    difficultyLevels?: number[],
    orderBy: 'asc' | 'desc' = 'asc',
    page = 1,
    limit = 10,
    isCreated = 0,
  ) {
    const skip = (page - 1) * limit;
    const isCreatedCondition = isCreated
      ? { creatorId: userId }
      : { NOT: [{ creatorId: userId }] };

    const [total, data] = await Promise.all([
      this.prismaService.course.count({
        where: {
          ...isCreatedCondition,
          title: {
            contains: title,
            mode: 'insensitive',
          },
          categoryId:
            categoryIds && categoryIds.length > 0
              ? { in: categoryIds }
              : undefined,
          difficultyLevel:
            difficultyLevels && difficultyLevels.length > 0
              ? { in: difficultyLevels }
              : undefined,
        },
      }),
      this.prismaService.course.findMany({
        where: {
          ...isCreatedCondition,
          title: {
            contains: title,
            mode: 'insensitive',
          },
          categoryId:
            categoryIds && categoryIds.length > 0
              ? { in: categoryIds }
              : undefined,
          difficultyLevel:
            difficultyLevels && difficultyLevels.length > 0
              ? { in: difficultyLevels }
              : undefined,
        },
        orderBy: {
          createdAt: orderBy,
        },
        skip,
        take: Number(limit),
        include: {
          category: true,
          UsersAssignedToCourse: {
            where: {
              userId,
            },
          },
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
              tests: true,
            },
          },
        },
      }),
    ]);

    return {
      data:
        isCreated === 0
          ? data.filter((course) => course.UsersAssignedToCourse.length)
          : data,
      total,
    };
  }

  async findCreatedCourses(userId: string) {
    return await this.prismaService.course.findMany({
      where: {
        creatorId: userId,
      },
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
            tests: true,
          },
        },
      },
    });
  }

  async findWithEnrollment(courseId: string, userId: string) {
    const course = await this.prismaService.course.findUnique({
      where: { id: courseId },
      include: {
        UsersAssignedToCourse: {
          where: {
            userId,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
        sections: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            lectures: {
              orderBy: {
                createdAt: 'asc',
              },
            },
            tests: { include: { questions: { include: { answers: true } } } },
          },
        },
      },
    });
    if (!course)
      throw new BadRequestException('Немає курсу з вказаним ідентифікатором');
    return course;
  }

  async findOne(id: string) {
    const course = await this.prismaService.course.findUnique({
      where: { id },
      include: {
        sections: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            lectures: {
              orderBy: {
                createdAt: 'asc',
              },
            },
            tests: {
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
        },
      },
    });
    if (!course)
      throw new BadRequestException('Немає курсу з вказаним ідентифікатором');
    return course;
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
    imageUrl?: string,
  ) {
    const updatedCourse = { ...updateCourseDto };
    if (imageUrl) updatedCourse['image'] = imageUrl;

    return await this.prismaService.course.update({
      where: { id },
      data: {
        ...updatedCourse,
        categoryId: {
          set: updatedCourse.categoryId,
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.course.delete({
      where: { id },
    });
  }

  async getAllCategories() {
    return await this.prismaService.category.findMany();
  }

  async getCourseContent(id: string, userId: string) {
    await this.checkIfRegisteredOnCourse(id, userId);

    const courseInfo = await this.prismaService.course.findFirst({
      where: { id },
      select: {
        title: true,
        id: true,
        sections: {
          select: {
            id: true,
            title: true,
            lectures: {
              select: {
                id: true,
                content: true,
                videoUrl: true,
                createdAt: true,
                title: true,
              },
            },
            tests: {
              select: {
                id: true,
                createdAt: true,
                title: true,
                questions: true,
              },
            },
          },
        },
      },
    });

    (courseInfo['sections'] as any) = courseInfo.sections.map((section) => ({
      title: section.title,
      id: section.id,
      materials: [...section.lectures, ...section.tests]
        .sort((a, b) => moment(a.createdAt).diff(moment(b.createdAt)))
        .map((material: any) => ({
          type: material?.questions?.length
            ? 'TEST'
            : material?.videoUrl
            ? 'VIDEO'
            : 'LECTURE',
          id: material.id,
          title: material.title,
        })),
    }));

    return courseInfo;
  }

  async getCourseMaterialById(
    courseId: string,
    userId: string,
    sectionId: string,
    materialId: string,
    type: 'LECTURE' | 'TEST',
  ) {
    await this.checkIfRegisteredOnCourse(courseId, userId);

    if (type === 'LECTURE') {
      const lecture = await this.prismaService.section.findFirst({
        where: { id: sectionId },
        select: {
          lectures: {
            where: { id: materialId },
            select: {
              id: true,
              content: true,
              videoUrl: true,
              createdAt: true,
              title: true,
            },
          },
        },
      });
      if (lecture)
        return {
          type: lecture.lectures[0].videoUrl ? 'VIDEO' : 'LECTURE',
          material: lecture.lectures[0],
        };
      throw new BadRequestException('Немає лекції з вказаним ідентифікатором');
    } else {
      const test = await this.prismaService.section.findFirst({
        where: { id: sectionId },
        select: {
          tests: {
            where: { id: materialId },
            select: {
              id: true,
              createdAt: true,
              title: true,
              timeToPass: true,
              totalAttempts: true,
              sectionId: true,
              questions: {
                select: {
                  id: true,
                  isMultipleChoice: true,
                  points: true,
                  text: true,
                  answers: {
                    select: {
                      id: true,
                      text: true,
                      isCorrect: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (!test)
        throw new BadRequestException('Немає тесту з вказаним ідентифікатором');

      let testResult;
      const userEnrollment =
        await this.prismaService.usersAssignedToCourse.findFirst({
          where: { courseId, userId },
        });
      if (userEnrollment)
        testResult = await this.prismaService.testResult.findFirst({
          where: { testId: test.tests[0].id, enrollmentId: userEnrollment.id },
        });

      return {
        type: 'TEST',
        material: {
          ...test.tests[0],
          questions: test.tests[0].questions.map((q) => ({
            ...q,
            answers: q.answers.map((a) => ({ id: a.id, text: a.text })),
          })),
          result: {
            score: testResult?.score ?? 0,
            currentAttempt: testResult?.currentAttempt ?? 0,
            isCompleted: testResult?.isCompleted,
            correctAnswers: testResult?.isCompleted
              ? test.tests[0].questions
              : [],
            // availability: {
            //   availableTestId: 'asdasdasd',
            //   isAvailable: true, //availableTestId ===  test.id
            // },
          },
        },
      };
    }
  }

  async getCourseStatistics(courseId: string, userId: string) {
    await this.checkIfRegisteredOnCourse(courseId, userId);

    const course = await this.prismaService.course.findUnique({
      where: { id: courseId },
      include: {
        sections: {
          include: {
            tests: {
              include: {
                questions: {
                  select: {
                    answers: true,
                    id: true,
                    isMultipleChoice: true,
                    points: true,
                    text: true,
                  },
                },

                testResult: {
                  where: { UsersAssignedToCourse: { userId } },
                },
              },
            },
          },
        },
      },
    });

    if (!course) {
      throw new Error('Немає курсу з даним ідентифікатором');
    }

    let totalCoursePoints = 0;
    let receivedCoursePoints = 0;
    let totalTestsCount = 0;
    let passedTestsCount = 0;

    const sectionsDetails = course.sections.map((section) => {
      let totalPoints = 0;
      let receivedPoints = 0;
      let totalTests = section.tests.length;
      let passedTests = 0;

      section.tests.forEach((test) => {
        const testResult = test.testResult[0]; // Assuming each test has at most one result per user
        const totalTestPoints = test.questions.reduce(
          (acc, q) => acc + q.points,
          0,
        );
        totalPoints += totalTestPoints;
        if (testResult && testResult.isCompleted) {
          receivedPoints += testResult.score;
          passedTests += 1;
        }
      });

      totalCoursePoints += totalPoints;
      receivedCoursePoints += receivedPoints;
      totalTestsCount += totalTests;
      passedTestsCount += passedTests;

      return {
        sectionTitle: section.title,
        totalTests,
        passedTests,
        totalPoints,
        receivedPoints,
        progressInPercents:
          totalPoints > 0 ? (receivedPoints / totalPoints) * 100 : 0,
      };
    });

    const detailedEvaluations = course.sections.map((section) => ({
      sectionTitle: section.title,
      sectionId: section.id,
      tests: section.tests.map((test) => {
        const testResult = test.testResult[0];
        const totalTestPoints = test.questions.reduce(
          (acc, q) => acc + q.points,
          0,
        );
        return {
          id: test.id,
          title: test.title,
          totalPoints: totalTestPoints,
          receivedPoints: testResult ? testResult.score : undefined,
        };
      }),
    }));

    const currentCourseProgress =
      totalCoursePoints > 0
        ? (receivedCoursePoints / totalCoursePoints) * 100
        : 0;
    const minimalCourseProgress = 80; // Placeholder value, adjust as needed

    return {
      currentCourseProgress,
      minimalCourseProgress,
      sectionsDetails,
      detailedEvaluations,
    };
  }

  async getCourseDates(courseId: string, userId: string) {
    await this.checkIfRegisteredOnCourse(courseId, userId);

    const course = await this.prismaService.course.findUnique({
      where: { id: courseId },
      include: {
        sections: {
          include: {
            tests: {
              include: {
                testResult: {
                  where: { UsersAssignedToCourse: { userId, courseId } },
                },
              },
            },
          },
        },
        UsersAssignedToCourse: {
          select: {
            assignedAt: true,
            expiresAt: true,
            isCompleted: true,
            isFailed: true,
          },
          where: { userId, courseId },
        },
      },
    });

    if (!course) {
      throw new Error('Немає курсу з даним ідентифікатором');
    }

    // console.log('COURSE: ', course);

    const dates = [];

    // Course start time
    dates.push({
      date: course.UsersAssignedToCourse[0].assignedAt.toISOString(),
      description: 'Початок курсу',
      isActive: false,
    });

    // Test pass times
    course.sections.forEach((section) => {
      section.tests.forEach((test) => {
        const testResult = test.testResult[0];
        if (testResult) {
          dates.push({
            date: testResult.createdAt.toISOString(),
            description: `Тест "${test.title}" пройдено`,
            isActive: false,
          });
        }
      });
    });

    const completeCondition =
      course.UsersAssignedToCourse[0].isCompleted ||
      course.UsersAssignedToCourse[0].isFailed;
    // Course end time
    dates.push({
      date: completeCondition
        ? dates[dates.length - 1].date
        : course.UsersAssignedToCourse[0].expiresAt.toISOString(),
      description: 'Закінчення курсу',
      isActive: false,
    });

    // Determine if the current date object is in progress
    const currentDate = new Date();
    dates.forEach((step) => {
      if (new Date(step.date) <= currentDate) {
        step.isActive = true;
      }
    });

    return { dates };
  }

  async checkIfRegisteredOnCourse(courseId: string, userId: string) {
    const count = await this.prismaService.usersAssignedToCourse.count({
      where: { courseId, userId },
    });

    if (count <= 0) {
      throw new BadRequestException('Ви не зареєстровані на даний курс');
    }
  }
}
