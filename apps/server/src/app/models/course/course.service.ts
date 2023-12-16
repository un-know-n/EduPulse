import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CourseService {
  constructor(private prismaService: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.prismaService.course.create({
      data: {
        ...createCourseDto,
      },
    });
  }

  async findAll() {
    return await this.prismaService.course.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.course.findUnique({ where: { id } });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.prismaService.course.update({
      where: { id },
      data: {
        ...updateCourseDto,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.course.delete({
      where: { id },
    });
  }
}
