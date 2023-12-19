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
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { TeacherRoleGuard } from '../../common/guards/teacher-role.guard';

@UseGuards(JwtGuard, TeacherRoleGuard)
@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  create(
    @Query('courseId') courseId: string,
    @Body() createSectionDto: CreateSectionDto,
  ) {
    return this.sectionService.create(courseId, createSectionDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(id, updateSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(id);
  }
}
