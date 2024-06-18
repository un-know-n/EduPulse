import { IsString, IsOptional } from 'class-validator';

export class CreateLectureDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  videoUrl: string;
}
