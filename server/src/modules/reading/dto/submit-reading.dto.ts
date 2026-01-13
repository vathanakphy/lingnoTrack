import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ExerciseAnswerDto } from './exercise-answer.dto';

export class SubmitReadingDto {
  @ApiProperty({
    example: '65a9f3c2b4e12a001234abcd',
    description: 'Reading article ID',
  })
  @IsMongoId()
  articleId: string;

  @ApiProperty({
    type: [ExerciseAnswerDto],
    description: 'User answers for exercises',
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ExerciseAnswerDto)
  answers: ExerciseAnswerDto[];
}
