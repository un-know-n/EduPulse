import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseCommentDto } from './create-course-comment.dto';

export class UpdateCourseCommentDto extends PartialType(CreateCourseCommentDto) {
  id: number;
}
