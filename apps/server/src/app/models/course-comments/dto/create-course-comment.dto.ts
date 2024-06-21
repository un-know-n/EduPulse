import { IsString } from 'class-validator';

export class CreateCourseCommentDto {
  @IsString()
  text: string;

  @IsString()
  userId: string;

  @IsString()
  courseId: string;
}
