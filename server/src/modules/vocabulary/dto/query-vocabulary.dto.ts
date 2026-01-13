import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryVocabularyDto {
  @ApiPropertyOptional({ description: 'Word to search', example: 'Ephemeral' })
  @IsOptional()
  @IsString()
  word?: string;

  @ApiPropertyOptional({ description: 'Filter by type', example: 'adjective' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ description: 'Filter by creation date (YYYY-MM-DD)', example: '2026-01-11' })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiPropertyOptional({ description: 'Page number', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Page size', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}
