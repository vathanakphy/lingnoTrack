import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import {
  ReadingArticle,
  ReadingArticleSchema,
  ReadingExercise,
  ReadingExerciseSchema,
  ReadingHistory,
  ReadingHistorySchema,
} from '../../databases/schemas/reading.schema';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReadingArticle.name, schema: ReadingArticleSchema },
      { name: ReadingExercise.name, schema: ReadingExerciseSchema },
      { name: ReadingHistory.name, schema: ReadingHistorySchema },
    ]),
    AiModule
  ],
  providers: [ReadingService],
  controllers: [ReadingController],
  exports: [ReadingService,MongooseModule], // export service if needed in other modules
})
export class ReadingModule {}
