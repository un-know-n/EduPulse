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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { TeacherRoleGuard } from '../../common/guards/teacher-role.guard';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

const maxImageSize = 1000 * 1000; // measured in bytes
const parseFilePipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({
      maxSize: maxImageSize,
      message: `Image must be less than ${maxImageSize / 1000000}MB`,
    }),
    new FileTypeValidator({
      fileType: new RegExp('image\\/(jpeg|jpg|png)'),
    }),
  ],
});

@Controller('course')
@UseGuards(JwtGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(TeacherRoleGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile(parseFilePipe)
    file: Express.Multer.File,
    @Body() createCourseDto: CreateCourseDto,
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
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }
}