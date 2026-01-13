import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateVocabularyDto {
    @ApiProperty({
        description: 'The vocabulary word',
        example: 'Ephemeral',
    })
    @IsString()
    @IsNotEmpty()
    word: string;

    @ApiProperty({
        description: 'The type of the word (noun, verb, adjective, etc.)',
        example: 'adjective',
    })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({
        description: 'Definition of the word',
        example: 'Lasting for a very short time.',
    })
    @IsString()
    @IsNotEmpty()
    definition: string;

    @ApiProperty({
        description: 'Example sentence using the word',
        example: 'Fame in the digital age can be ephemeral.',
        required: false,
    })
    @IsString()
    @IsOptional()
    example?: string;

    @ApiProperty({
        description: 'Image URL or path for the word',
        example: 'https://example.com/image.png',
        required: false,
    })
    @IsString()
    @IsOptional()
    image?: string;
}
