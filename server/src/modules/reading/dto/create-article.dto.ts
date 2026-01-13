import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ example: 'The Impact of Technology on Education' })
  @IsString()
  @IsNotEmpty()
  topic: string;

  @ApiPropertyOptional({ example: 'Academic Article' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ example: '6 min' })
  @IsString()
  @IsOptional()
  readTime?: string;

  @ApiProperty({ example: '# Article content in Markdown...' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ example: 'https://example.com/original-article' })
  @IsString()
  @IsOptional()
  sourceLink?: string;
}
