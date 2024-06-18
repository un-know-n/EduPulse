import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class LectureService {
  constructor(private prismaService: PrismaService) {}

  async create(sectionId: string, data: CreateLectureDto) {
    return await this.prismaService.lecture.create({
      data: {
        section: { connect: { id: sectionId } },
        ...data,
      },
    });
  }

  async update(id: string, data: UpdateLectureDto) {
    return await this.prismaService.lecture.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return await this.prismaService.lecture.delete({
      where: {
        id,
      },
    });
  }
}
