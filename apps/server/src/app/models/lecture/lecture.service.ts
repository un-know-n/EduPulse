import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class LectureService {
  constructor(private prismaService: PrismaService) {}

  async create(sectionId: string, { title, content }: CreateLectureDto) {
    return await this.prismaService.lecture.create({
      data: {
        section: { connect: { id: sectionId } },
        title,
        content,
      },
    });
  }

  async update(id: string, { title, content }: UpdateLectureDto) {
    return await this.prismaService.lecture.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
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
