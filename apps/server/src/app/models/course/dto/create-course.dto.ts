import { IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  creatorId: string;

  @IsNumber()
  difficultyLevel: number;

  @IsString()
  purpose: string;

  @IsNumber()
  timeToPass: number;
}
