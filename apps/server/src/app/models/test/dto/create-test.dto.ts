import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsBoolean,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  text: string;

  @IsBoolean()
  isCorrect: boolean;
}

export class CreateQuestionDto {
  @IsString()
  text: string;

  @Transform((value) => Number(value.value))
  @IsNumber()
  @IsPositive()
  points: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];

  @IsBoolean()
  isMultipleChoice: boolean;
}

export class CreateTestDto {
  @IsString()
  title: string;

  @Transform((value) => Number(value.value))
  @IsNumber()
  @IsPositive()
  timeToPass: number;

  @Transform((value) => Number(value.value))
  @IsNumber()
  @IsPositive()
  totalAttempts: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
