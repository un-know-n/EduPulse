import { IsString } from 'class-validator';

export class CreateLectureDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
