import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class ReadingArticle {
  @Prop({ required: true })
  topic: string;

  @Prop()
  type: string;

  @Prop()
  readTime: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  sourceLink?: string; // URL to the original article

  @Prop([String])
  wordsMarkdown?: string[]; // List of vocabulary/words in markdown format
}
export const ReadingArticleSchema = SchemaFactory.createForClass(ReadingArticle);
export type ReadingArticleDocument = ReadingArticle & Document;

@Schema({ timestamps: true })
export class ReadingExercise {
  @Prop({ required: true })
  type: string;

  @Prop()
  question?: string;

  @Prop()
  statement?: string;

  @Prop([String])
  options?: string[];

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  answer: any;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'ReadingArticle', required: true })
  article: Types.ObjectId;
}
export const ReadingExerciseSchema = SchemaFactory.createForClass(ReadingExercise);
export type ReadingExerciseDocument = ReadingExercise & Document;

@Schema({ timestamps: true })
export class ReadingHistory {
  @Prop({ required: true })
  topic: string;

  @Prop({ type: Types.ObjectId, ref: 'ReadingArticle', required: true })
  article: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'ReadingExercise' }])
  exercises: Types.ObjectId[];

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  correct: number;

  @Prop({ required: true })
  total: number;

  @Prop([String])
  feedback: string[];

  // NEW: Save per-question results
  @Prop([
    {
      exerciseId: { type: Types.ObjectId, ref: 'ReadingExercise' },
      question: String,
      userAnswer: String,
      correctAnswer: String,
      isCorrect: Boolean,
      aiFeedback: String,
    },
  ])
  results?: {
    exerciseId: Types.ObjectId;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    aiFeedback?: string;
  }[];
}

export const ReadingHistorySchema = SchemaFactory.createForClass(ReadingHistory);
export type ReadingHistoryDocument = ReadingHistory & Document;