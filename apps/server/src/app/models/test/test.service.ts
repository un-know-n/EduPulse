import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaService } from '../../prisma.service';

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
}
