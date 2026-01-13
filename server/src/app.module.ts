import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongoDatabaseModule } from './databases/mongo_databases';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module';
import { ReadingModule } from './modules/reading/reading.module';
import { WritingModule } from './modules/writing/writing.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AiModule } from './modules/ai/ai.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    ScheduleModule.forRoot(), // <-- must have this
    MongoDatabaseModule,
    VocabularyModule,
    ReadingModule,
    WritingModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
