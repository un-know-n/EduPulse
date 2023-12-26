import { IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @IsString()
  userId: string;
  
  @IsString()
  courseId: string;
}
