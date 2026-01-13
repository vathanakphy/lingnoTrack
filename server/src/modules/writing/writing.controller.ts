import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { WritingService } from './writing.service';
import { WritingSubmission } from '../../databases/schemas/writting.schema';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubmitWritingDto } from './dto/submit-writing.dto';
import { WritingEvaluationDto } from '../ai/dto/writing-evaluation.dto';

@Controller('writing')
export class WritingController {
  constructor(private readonly writingService: WritingService) { }

  // GET /writing/history
  @Get('history')
  async getHistory(): Promise<WritingSubmission[]> {
    return this.writingService.getHistory();
  }

  // POST /writing/submit
  @Post('submit')
  @ApiOperation({ summary: 'Submit writing for evaluation' })
  @ApiBody({ type: SubmitWritingDto })
  @ApiResponse({ status: 201, description: 'Writing evaluated successfully', type: WritingSubmission })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async submitWriting(
    @Body() submitDto: SubmitWritingDto,
  ): Promise<WritingSubmission> {
    try {
      const { topic, text } = submitDto;
      return await this.writingService.submitWriting(topic, text);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }


  @Get('topics')
  getTopics() {
    return this.writingService.generateTopic();
  };


}
