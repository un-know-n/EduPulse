import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { TeacherRoleGuard } from '../../common/guards/teacher-role.guard';
import { TUser, User } from '../user/user.decorator';

@Controller('enrollment')
@UseGuards(JwtGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollmentService.findOne(id);
  }

  @Patch(':id')
  reset(@Param('id') id: string) {
    return this.enrollmentService.reset(id);
  }

  @UseGuards(TeacherRoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: TUser) {
    return this.enrollmentService.remove(id, user);
  }
}
