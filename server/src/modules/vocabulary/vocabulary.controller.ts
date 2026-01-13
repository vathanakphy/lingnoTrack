import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { QueryVocabularyDto } from './dto/query-vocabulary.dto';

@Controller('vocabulary')
export class VocabularyController {
    constructor(private readonly vocabularyService: VocabularyService) { }

    @Post()
    create(@Body() data: CreateVocabularyDto) {
        return this.vocabularyService.create(data);
    }

    @Get()
    findAll(@Query() query: QueryVocabularyDto) {
        return this.vocabularyService.findAll(query);
    }

    @Get('hint')
    getHintWord() {
        // Call service method (mocked)
        return this.vocabularyService.getHintWord();
    }

    @Get('current')
    getCurrentWord() {
        return this.vocabularyService.getCurrentWord();
    }


    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.vocabularyService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.vocabularyService.remove(id);
    }

}
