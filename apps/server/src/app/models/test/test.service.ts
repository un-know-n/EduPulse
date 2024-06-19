import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaService } from '../../prisma.service';
import { CreateTestResultDto } from './dto/create-test-result.dto';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async create(sectionId: string, { questions, ...data }: CreateTestDto) {
    return this.prismaService.test.create({
      data: {
        section: { connect: { id: sectionId } },
        ...data,
        questions: {
          create: questions.map((question) => ({
            ...question,
            answers: {
              create: question.answers.map((answer) => ({
                ...answer,
              })),
            },
          })),
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prismaService.test.findUnique({ where: { id } });
  }

  async update(id: string, { questions, ...data }: UpdateTestDto) {
    const test = await this.prismaService.test.findUnique({
      where: { id },
      include: { questions: { include: { answers: true } } },
    });
    if (!test) {
      throw new NotFoundException('Тест з даним ідентифікатором не знайдено');
    }

    return this.prismaService.$transaction(async (tx) => {
      const deletedPost = await tx.test.delete({ where: { id } });

      const { title, totalAttempts, timeToPass, sectionId } = deletedPost;

      // TODO: Get rid of logic DUPLICATION!!!!!!!!!
      const updatedPost = await tx.test.create({
        data: {
          section: { connect: { id: sectionId } },
          title,
          totalAttempts,
          timeToPass,
          ...data,
          createdAt: deletedPost.createdAt,
          questions: {
            create: questions.map((question) => ({
              ...question,
              answers: {
                create: question.answers.map((answer) => ({
                  ...answer,
                })),
              },
            })),
          },
        },
      });

      return updatedPost;
    });
  }

  async remove(id: string) {
    return this.prismaService.test.delete({ where: { id } });
  }

  async passCourseTest(
    testId: string,
    userId: string,
    { answers }: CreateTestResultDto,
  ) {
    return this.prismaService.$transaction(async (tx) => {
      const test = await tx.test.findUnique({
        where: { id: testId },
        include: {
          section: {
            select: {
              courseId: true,
            },
          },
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });

      if (!test) {
        throw new BadRequestException('Немає тесту з даним ідентифікатором');
      }

      const userEnrollment = await tx.usersAssignedToCourse.findFirst({
        where: {
          userId,
          courseId: test.section.courseId,
        },
      });

      if (!userEnrollment) {
        throw new BadRequestException('Ви не зареєстровані на даний курс');
      }

      // Fetch or create a TestResult record
      let testResult = await tx.testResult.findFirst({
        where: { testId, UsersAssignedToCourse: { userId } },
      });

      if (!testResult) {
        testResult = await tx.testResult.create({
          data: {
            testId,
            enrollmentId: userEnrollment.id,
            currentAttempt: 0,
          },
        });
      }

      // Check if the test can still be passed
      if (testResult.currentAttempt >= test.totalAttempts) {
        throw new BadRequestException(
          'Ви використали всі спроби для складання цього тесту',
        );
      }

      // Calculate the score
      let score = 0;
      test.questions.forEach((question) => {
        const userAnswers =
          answers.find((a) => a.questionId === question.id)?.selectedAnswers ||
          [];
        const correctAnswers = question.answers
          .filter((a) => a.isCorrect)
          .map((a) => a.text);
        if (question.isMultipleChoice) {
          if (
            userAnswers.length === correctAnswers.length &&
            userAnswers.every((answer) => correctAnswers.includes(answer))
          ) {
            score += question.points;
          }
        } else {
          if (userAnswers[0] === correctAnswers[0]) {
            score += question.points;
          }
        }
      });

      // Update the TestResult
      testResult = await tx.testResult.update({
        where: { id: testResult.id },
        data: {
          score,
          isCompleted:
            (score / test.questions.reduce((acc, q) => (acc += q.points), 0)) *
              100 >=
            80,
          currentAttempt: { increment: 1 },
        },
      });

      // Check if all tests in the course are completed
      const allTests = await tx.test.findMany({
        where: { section: { courseId: test.section.courseId } },
        include: { testResult: true, questions: true },
      });

      const completedTests = allTests.filter((t) =>
        t.testResult.some((tr) => tr.enrollmentId === testResult.enrollmentId),
      );

      if (completedTests.length === allTests.length) {
        const totalPoints = allTests.reduce(
          (sum, t) => sum + t.questions.reduce((sum, q) => sum + q.points, 0),
          0,
        );
        const userPoints = completedTests.reduce(
          (sum, t) =>
            sum +
            t.testResult.find(
              (tr) => tr.enrollmentId === testResult.enrollmentId,
            ).score,
          0,
        );

        const averageScore = (userPoints / totalPoints) * 100;

        await tx.usersAssignedToCourse.update({
          where: { id: testResult.enrollmentId },
          data: {
            isCompleted: averageScore >= 80,
            isFailed: averageScore < 80,
          },
        });
      }

      return testResult;
    });
  }
}
