import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsIn } from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty({ description: 'Type of exercise', enum: ['mcq', 'fillBlank', 'trueFalse', 'shortAnswer'] })
  @IsString()
  @IsIn(['mcq', 'fillBlank', 'trueFalse', 'shortAnswer'])
  type: string;

  @ApiProperty({ description: 'Question text', required: false })
  @IsString()
  @IsOptional()
  question?: string;

  @ApiProperty({ description: 'Statement for true/false', required: false })
  @IsString()
  @IsOptional()
  statement?: string;

  @ApiProperty({ description: 'Options for MCQ', type: [String], required: false })
  @IsArray()
  @IsOptional()
  options?: string[];

  @ApiProperty({ description: 'Answer (index for MCQ, string for fillBlank, boolean for trueFalse, string for shortAnswer)' })
  @IsNotEmpty()
  answer: any;
}
