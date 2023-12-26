import { IsIn, IsNumber, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  creatorId: string;

  @Transform((value) => Number(value.value))
  @IsNumber()
  @IsIn([1, 2, 3])
  difficultyLevel: number;

  @IsString()
  purpose: string;

  @Transform((value) => Number(value.value))
  @IsNumber()
  @IsPositive()
  timeToPass: number;
}
