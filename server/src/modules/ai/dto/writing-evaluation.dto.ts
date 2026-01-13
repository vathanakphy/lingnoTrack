// src/ai/dto/writing-evaluation.dto.ts
import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';

export class WritingEvaluationStatsDto {
  @IsString()
  vocabulary: string;

  @IsString()
  readability: string;
}

export class WritingEvaluationDto {
  @IsNumber()
  score: number;

  @IsArray()
  @IsString({ each: true })
  feedback: string[];

  @IsObject()
  stats: WritingEvaluationStatsDto;
}
