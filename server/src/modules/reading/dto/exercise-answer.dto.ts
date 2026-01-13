import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ExerciseAnswerDto {
  @ApiProperty({
    example: '65aa1111b4e12a001234abcd',
    description: 'Exercise ID',
  })
  @IsMongoId()
  exerciseId: string;

  @ApiProperty({
    example: 'B',
    description: 'User answer (string / number / boolean)',
  })
  @IsNotEmpty()
  answer: any;
}
