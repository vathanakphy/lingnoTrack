// src/ai/dto/writing-topic.dto.ts
import { IsString } from 'class-validator';

export class WritingTopicDto {
  @IsString()
  topic: string;

  @IsString()
  hint: string;
}
