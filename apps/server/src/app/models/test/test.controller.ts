import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { TeacherRoleGuard } from '../../common/guards/teacher-role.guard';
import { User, TUser } from '../user/user.decorator';
import { CreateTestResultDto } from './dto/create-test-result.dto';

@UseGuards(JwtGuard)
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @UseGuards(TeacherRoleGuard)
  create(
    @Query('sectionId') sectionId: string,
    @Body() createTestDto: CreateTestDto,
  ) {
    return this.testService.create(sectionId, createTestDto);
  }

  @Get(':id')
  @UseGuards(TeacherRoleGuard)
  findOne(@Param('id') id: string) {
    return this.testService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(TeacherRoleGuard)
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(id, updateTestDto);
  }

  @Delete(':id')
  @UseGuards(TeacherRoleGuard)
  remove(@Param('id') id: string) {
    return this.testService.remove(id);
  }

  @Post(':id')
  passCourseTest(
    @Param('id') id: string,
    @Body() createTestResultDto: CreateTestResultDto,
    @User() user: TUser,
  ) {
    return this.testService.passCourseTest(id, user.id, createTestResultDto);
  }
}
