import 'multer';

import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { JwtGuard } from '../../common/guards/jwt.guard';
import { TeacherRoleGuard } from '../../common/guards/teacher-role.guard';
import { TUser, User } from '../user/user.decorator';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

const maxImageSize = 1024 * 1024; // measured in bytes
const parseFilePipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({
      maxSize: maxImageSize,
      message: `Зображення повинно бути меншим за 1MB`,
    }),
    new FileTypeValidator({
      fileType: new RegExp('image\\/(jpeg|jpg|png)'),
    }),
  ],
  fileIsRequired: false,
});

@Controller('course')
@UseGuards(JwtGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(TeacherRoleGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile(parseFilePipe)
    file?: Express.Multer.File,
  ) {
    return this.courseService.executeWithImage(
      (fileUrl?: string) => this.courseService.create(createCourseDto, fileUrl),
      file,
    );
  }

  @UseGuards(TeacherRoleGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @UploadedFile(parseFilePipe) file: Express.Multer.File,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    const deleteCallback = await this.courseService.deletePreviousCourseImage(
      id,
    );

    const updateResponse = await this.courseService.executeWithImage(
      (fileUrl?: string) =>
        this.courseService.update(id, updateCourseDto, fileUrl),
      file,
    );

    try {
      await deleteCallback();
    } catch {
      return updateResponse;
    }

    return updateResponse;
  }

  @UseGuards(TeacherRoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }

  @Get()
  findAll(
    @User() user: TUser,
    @Query('searchString') searchString?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ) {
    return this.courseService.findAll(user.id, searchString, orderBy);
  }

  @Get('created')
  findCreatedCourses(@User() user: TUser) {
    return this.courseService.findCreatedCourses(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: TUser) {
    return this.courseService.findWithEnrollment(id, user.id);
  }
}
