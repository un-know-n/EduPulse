import 'multer';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import {
  CloudinaryService,
  parseFilePipe,
} from '../../common/modules/cloudinary/cloudinary.service';
import { Public } from '../../common/decorators/public.decorator';

@Controller('course')
@UseGuards(JwtGuard)
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get('categories')
  @Public()
  getAllCategories() {
    return this.courseService.getAllCategories();
  }

  @UseGuards(TeacherRoleGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile(parseFilePipe)
    file?: Express.Multer.File,
  ) {
    return this.cloudinaryService.executeWithImage(
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

    const updateResponse = await this.cloudinaryService.executeWithImage(
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

  @Get('search')
  async searchCourses(
    @User() user: TUser,
    @Query('title') title: string,
    @Query('categoryIds') categoryIds?: string,
    @Query('difficultyLevels') difficultyLevels?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('isCreated') isCreated?: 0 | 1,
  ) {
    const categoryIdsArray = categoryIds
      ? categoryIds.split(',').map(Number)
      : undefined;
    const difficultyLevelsArray = difficultyLevels
      ? difficultyLevels.split(',').map(Number)
      : undefined;

    return this.courseService.searchCourses(
      user.id,
      title,
      categoryIdsArray,
      difficultyLevelsArray,
      orderBy,
      page,
      limit,
      isCreated,
    );
  }

  @Get('created')
  findCreatedCourses(@User() user: TUser) {
    return this.courseService.findCreatedCourses(user.id);
  }

  @Get(':id/content')
  // @Public()
  getCourseContent(@Param('id') id: string, @User() user: TUser) {
    return this.courseService.getCourseContent(id, user.id);
  }

  @Get(':id/material/:sectionId/:materialId')
  getCourseMaterial(
    @Param('id') id: string,
    @Param('sectionId') sectionId: string,
    @Param('materialId') materialId: string,
    @User() user: TUser,
    @Query('type') type: 'TEST' | 'LECTURE',
  ) {
    return this.courseService.getCourseMaterialById(
      id,
      user.id,
      sectionId,
      materialId,
      type,
    );
  }

  @Get(':id/statistics')
  getCourseStatistics(@Param('id') id: string, @User() user: TUser) {
    return this.courseService.getCourseStatistics(id, user.id);
  }

  @Get(':id/dates')
  getCourseDates(@Param('id') id: string, @User() user: TUser) {
    return this.courseService.getCourseDates(id, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: TUser) {
    return this.courseService.findWithEnrollment(id, user.id);
  }
}
