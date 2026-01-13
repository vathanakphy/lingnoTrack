import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WritingSubmissionDocument = WritingSubmission & Document;

@Schema({ timestamps: true })
export class WritingResult {
  @Prop({ required: true })
  score: number;

  @Prop({ type: [String], required: true })
  feedback: string[];

  @Prop({ type: Object, required: true })
  stats: {
    vocabulary: string;
    readability: string;
  };
}

export const WritingResultSchema = SchemaFactory.createForClass(WritingResult);

@Schema({ timestamps: true })
export class WritingSubmission {
  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: WritingResultSchema, required: true }) // use the schema here
  result: WritingResult;
}

export const WritingSubmissionSchema = SchemaFactory.createForClass(WritingSubmission);
WritingSubmissionSchema.index({ topic: 1, createdAt: -1 });
