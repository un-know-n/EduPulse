import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class SectionService {
  constructor(private prismaService: PrismaService) {}

  async create(courseId: string, { title }: CreateSectionDto) {
    return await this.prismaService.section.create({
      data: {
        course: { connect: { id: courseId } },
        title,
      },
    });
  }

  async update(id: string, { title }: UpdateSectionDto) {
    return await this.prismaService.section.update({
      where: { id },
      data: {
        title,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.section.delete({
      where: { id },
    });
  }
}
