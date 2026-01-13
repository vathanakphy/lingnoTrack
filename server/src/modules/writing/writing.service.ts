import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WritingSubmission, WritingSubmissionDocument } from 'src/databases/schemas/writting.schema';
import { AiService } from '../ai/ai.service';
import { WritingTopicDto } from '../ai/dto/writing-topic.dto';

@Injectable()
export class WritingService {
    constructor(
        @InjectModel(WritingSubmission.name)
        private writingModel: Model<WritingSubmissionDocument>,
        private readonly aiService: AiService,
    ) { }

    async generateTopic(): Promise<WritingTopicDto> {
        return this.aiService.generateWritingTopic();
    }
    // Fetch all writing history, newest first
    async getHistory(): Promise<WritingSubmission[]> {
        return this.writingModel.find().sort({ createdAt: -1 }).exec();
    }

    // Submit a new writing entry
    async submitWriting(topic: string, text: string): Promise<WritingSubmission> {
        const wordCount = text.trim().split(/\s+/).length;
        if (wordCount < 50) {
            throw new BadRequestException('Writing must be at least 50 words');
        }
        const result = await this.aiService.evaluateWriting(text);
        const entry = new this.writingModel({
            topic,
            text,
            result: result,
        });

        return entry.save();
    }
}
