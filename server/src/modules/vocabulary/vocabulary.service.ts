import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vocabulary, VocabularyDocument } from 'src/databases/schemas/vocabulary.schema';
import { QueryVocabularyDto } from './dto/query-vocabulary.dto';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';

@Injectable()
export class VocabularyService {
    constructor(
        @InjectModel(Vocabulary.name) private vocabularyModel: Model<VocabularyDocument>,       
        
    ) { }

    async create(data: CreateVocabularyDto) {
        const vocab = new this.vocabularyModel(data);
        return vocab.save();
    }

    async findAll(query: QueryVocabularyDto) {
        const filter: any = {};

        if (query.word) {
            // case-insensitive search
            filter.word = { $regex: query.word, $options: 'i' };
        }

        if (query.type) {
            filter.type = query.type;
        }

        if (query.date) {
            const start = new Date(query.date);
            const end = new Date(query.date);
            end.setDate(end.getDate() + 1); // include the whole day
            filter.createdAt = { $gte: start, $lt: end };
        }

        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            this.vocabularyModel.find(filter).skip(skip).limit(limit).exec(),
            this.vocabularyModel.countDocuments(filter).exec(),
        ]);

        return {
            data: items,
            total,
            page,
            limit,
        };
    }

    getHintWord() {
        return {
            text: "analyze",
            partOfSpeech: "Verb",
            usageHint: "Used when you examine something carefully to understand it",
            exampleHint: "Scientists ___ the data before making conclusions.",
        };
    }
    async getCurrentWord() {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // start of day
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // start of next day

        var result = this.vocabularyModel.find({
            createdAt: { $gte: today, $lt: tomorrow },
        }).exec();
        if ((await result).length > 0) {
            return (await result);
        } else {
            return [];
        }
    }


    async findOne(id: string) {
        return this.vocabularyModel.findById(id).exec();
    }

    async remove(id: string) {
        return this.vocabularyModel.findByIdAndDelete(id).exec();
    }
}
