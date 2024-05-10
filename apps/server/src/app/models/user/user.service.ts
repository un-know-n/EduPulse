import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (user)
      throw new ConflictException(
        'Користувач із такою електронною поштою вже існує!',
      );
    const newUser = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, 10),
      },
    });
    const { password, ...rest } = newUser;

    return rest;
  }

  async findById(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: string, { password, role, name }: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        password: password ? await hash(password, 10) : null,
        role,
        name,
      },
    });
  }

  async updateProfile(
    id: string,
    updateUserDto: UpdateUserDto,
    imageUrl?: string,
  ) {
    const { password, role, ...updatedProfile } = updateUserDto;

    if (imageUrl) updatedProfile['image'] = imageUrl;

    return await this.prismaService.user.update({
      where: { id },
      data: updatedProfile,
    });
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
