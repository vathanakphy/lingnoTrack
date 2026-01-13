import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

// --- Exercise Types Enum ---
export enum ExerciseType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  FILL_IN_THE_BLANK = 'fill_in_the_blank',
  SHORT_ANSWER = 'short_answer',
  MATCHING = 'matching',
}

// --- DTO for Matching Pair ---
export class MatchingPairDto {
  @IsString()
  @IsNotEmpty()
  term: string;

  @IsString()
  @IsNotEmpty()
  definition: string;
}

// --- DTO for AI Exercise ---
export class AIExerciseDto {
  @IsEnum(ExerciseType)
  type: ExerciseType;

  // Multiple Choice
  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];

  @IsOptional()
  @IsString()
  answer?: string;

  // True/False
  @IsOptional()
  @IsString()
  statement?: string;

  @IsOptional()
  answerBoolean?: boolean; // For true/false

  // Fill in the blank
  @IsOptional()
  @IsString()
  sentence?: string;

  // Short Answer
  // Uses `question` and `answer`

  // Matching
  @IsOptional()
  @IsArray()
  pairs?: MatchingPairDto[];
}

// --- DTO for full AI Response ---
export class AIGeneratedReadingDto {
  @IsArray()
  exercises: AIExerciseDto[];

  @IsArray()
  @IsString({ each: true })
  wordsMarkdown: string[];
}
    