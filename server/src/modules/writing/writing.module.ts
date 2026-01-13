import { Module } from '@nestjs/common';
import { WritingService } from './writing.service';
import { WritingController } from './writing.controller';
import { WritingSubmission, WritingSubmissionSchema } from 'src/databases/schemas/writting.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WritingSubmission.name, schema: WritingSubmissionSchema },
    ]),
    AiModule
  ],
  controllers: [WritingController],
  providers: [WritingService,MongooseModule],
  exports: [WritingService,MongooseModule],
})
export class WritingModule {}
