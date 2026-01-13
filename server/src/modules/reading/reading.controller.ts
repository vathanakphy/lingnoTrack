import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingArticle, ReadingExercise, ReadingHistory } from '../../databases/schemas/reading.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { SubmitReadingDto } from './dto/submit-reading.dto';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Controller('reading')
export class ReadingController {
    constructor(private readonly readingService: ReadingService) { }

    /** Articles */
    @Get('article/today')
    async getArticlesToday() {
        return this.readingService.getArticlesToday();
    }

    @Get('articles')
    async getArticles(): Promise<ReadingArticle[]> {
        return this.readingService.getArticles();
    }



    @Get('articles/:id')
    async getArticle(@Param('id') id: string): Promise<ReadingArticle> {
        return this.readingService.getArticleById(id);
    }
    /** Exercises */
    @Get('articles/:id/exercises')
    async getExercises(@Param('id') articleId: string): Promise<ReadingExercise[]> {
        return this.readingService.getExercises(articleId);
    }

    @Post('articles')
    addArticle(@Body() dto: CreateArticleDto) {
        return this.readingService.addArticle(dto);
    }

    @Post('articles/:id/exercises')
    addExercises(@Param('id') articleId: string, @Body() exercises: CreateExerciseDto[]) {
        return this.readingService.addExercises(articleId, exercises);
    }
    @Post('submit')
    submitReading(@Body() dto: SubmitReadingDto) {
        return this.readingService.checkAndSubmit(dto);
    }



    @Get(':articleId/result')
    getReadingResult(@Param('articleId') articleId: string) {
        return this.readingService.getReadingResult(articleId);
    }


    /** Reading history */
    @Get('history')
    async getHistory(): Promise<ReadingHistory[]> {
        return this.readingService.getHistory();
    }
}
