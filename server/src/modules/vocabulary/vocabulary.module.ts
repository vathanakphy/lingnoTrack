import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyController } from './vocabulary.controller';
import { Vocabulary, VocabularySchema } from 'src/databases/schemas/vocabulary.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vocabulary.name, schema: VocabularySchema }]),
  ],

  providers: [VocabularyService],
  controllers: [VocabularyController],
  exports: [VocabularyService,MongooseModule],
})
export class VocabularyModule {}
