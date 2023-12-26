import 'multer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../../prisma.service';
import { CloudinaryService } from '../../common/modules/cloudinary/cloudinary.service';

@Injectable()
export class CourseService {
  constructor(
    private prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async executeWithImage(
    callback: (imageUrl?: string) => any,
    image?: Express.Multer.File,
  ) {
    if (image)
      return this.cloudinaryService
        .uploadImage(image)
        .then((image) => callback(image.url))
        .catch((error) => {
          throw new BadRequestException(error.message);
        });
    return callback();
  }

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
          OR: [{ title: { contains: searchString || '' } }],
        }
      : {};
    const sortOrder = orderBy || 'asc';

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
        sections: {
          include: {
            lectures: true,
          },
        },
      },
    });
    if (!course)
      throw new BadRequestException('Немає курсу з вказаним ідентифікатором!');
    return course;
  }

  async findOne(id: string) {
    const course = await this.prismaService.course.findUnique({
      where: { id },
      include: {
        sections: {
          include: {
            lectures: true,
          },
        },
      },
    });
    if (!course)
      throw new BadRequestException('Немає курсу з вказаним ідентифікатором!');
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
      data: updatedCourse,
    });
  }

  async remove(id: string) {
    return await this.prismaService.course.delete({
      where: { id },
    });
  }
}
