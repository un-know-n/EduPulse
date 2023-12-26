import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { TeacherRoleGuard } from '../../common/guards/teacher-role.guard';

@UseGuards(JwtGuard, TeacherRoleGuard)
@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post()
  create(
    @Query('sectionId') sectionId: string,
    @Body() createLectureDto: CreateLectureDto,
  ) {
    return this.lectureService.create(sectionId, createLectureDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLectureDto: UpdateLectureDto) {
    return this.lectureService.update(id, updateLectureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lectureService.remove(id);
  }
}
