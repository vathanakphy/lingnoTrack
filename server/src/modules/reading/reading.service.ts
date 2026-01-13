import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
    ReadingArticle,
    ReadingArticleDocument,
    ReadingExercise,
    ReadingExerciseDocument,
    ReadingHistory,
    ReadingHistoryDocument,
} from '../../databases/schemas/reading.schema';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { SubmitReadingDto } from './dto/submit-reading.dto';
import { AIGeneratedReadingDto, ExerciseType } from './dto/ai-exercise.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { AiService } from '../ai/ai.service';
import { AiExerciseInput, AiUserAnswer } from './dto/ai.types';

@Injectable()
export class ReadingService {
    constructor(
        @InjectModel(ReadingArticle.name)
        private readonly articleModel: Model<ReadingArticleDocument>,

        @InjectModel(ReadingExercise.name)
        private readonly exerciseModel: Model<ReadingExerciseDocument>,

        @InjectModel(ReadingHistory.name)
        private readonly historyModel: Model<ReadingHistoryDocument>,

        private readonly aiService: AiService,
    ) { }


    /** Get all articles */
    async getArticles(): Promise<ReadingArticle[]> {
        return this.articleModel.find().exec();
    }

    async getArticlesToday(): Promise<ReadingArticleDocument | null> {
        // 1. Get IDs of articles that are already completed (exist in history)
        const completedHistories = await this.historyModel
            .find({})
            .select('article')
            .lean();

        const completedArticleIds = completedHistories.map(h => h.article);

        // 2. Find the first article NOT in the completed list
        const nextArticle = await this.articleModel
            .findOne({ _id: { $nin: completedArticleIds } })
            .sort({ createdAt: 1 }) // optional: oldest first
            .exec();

        // 3. Return the article or null if all are completed
        if (!nextArticle) {
            throw new NotFoundException('No new articles available');
        }
        return nextArticle;
    }


    /** Get single article by ID */
    async getArticleById(id: string): Promise<ReadingArticle> {
        const article = await this.articleModel.findById(id).exec();
        if (!article) throw new NotFoundException('Article not found');
        return article;
    }

    /** Add a new article */
    async addArticle(dto: CreateArticleDto): Promise<ReadingArticle> {
        // 1️⃣ Generate AI exercises + words from content
        const aiData: AIGeneratedReadingDto = await this.aiService.generateExercisesArticle(dto.content);

        // 2️⃣ Save article
        const article = new this.articleModel({
            topic: dto.topic,
            type: dto.type,
            readTime: dto.readTime,
            content: dto.content,
            sourceLink: dto.sourceLink,
            wordsMarkdown: aiData.wordsMarkdown,
        });
        const savedArticle = await article.save();

        // 3️⃣ Save exercises
        for (const ex of aiData.exercises) {
            const exerciseData: Partial<ReadingExercise> = { type: ex.type, article: savedArticle._id };

            switch (ex.type) {
                case ExerciseType.MULTIPLE_CHOICE:
                    exerciseData.question = ex.question;
                    exerciseData.options = ex.options;
                    exerciseData.answer = ex.answer;
                    break;
                case ExerciseType.TRUE_FALSE:
                    exerciseData.statement = ex.statement;
                    exerciseData.answer = ex.answer;
                    break;
                case ExerciseType.FILL_IN_THE_BLANK:
                    exerciseData.statement = ex.sentence;
                    exerciseData.answer = ex.answer;
                    break;
                case ExerciseType.SHORT_ANSWER:
                    exerciseData.question = ex.question;
                    exerciseData.answer = ex.answer;
                    break;
            }

            const exerciseDoc = new this.exerciseModel(exerciseData);
            await exerciseDoc.save();
        }

        // 4️⃣ Return the saved article
        return savedArticle;
    }


    /** Add exercises for a specific article */
    async addExercises(articleId: string, exercises: CreateExerciseDto[]): Promise<ReadingExercise[]> {
        const article = await this.articleModel.findById(articleId).exec();
        if (!article) throw new NotFoundException('Article not found');

        const created = exercises.map(ex => ({
            ...ex,
            _id: new Types.ObjectId(),
            article: article._id,
        }));

        return this.exerciseModel.insertMany(created);
    }

    /** Get exercises for a specific article */
    async getExercises(articleId: string): Promise<ReadingExercise[]> {
        return this.exerciseModel.find({ article: articleId }).exec();
    }

    async checkAndSubmit(dto: SubmitReadingDto) {
        // 1. Load article
        const article = await this.articleModel.findById(dto.articleId).exec();
        if (!article) throw new NotFoundException('Article not found');

        // 2. Load exercises
        const exerciseIds = dto.answers.map(a => new Types.ObjectId(a.exerciseId));
        const exercises = await this.exerciseModel.find({
            _id: { $in: exerciseIds },
            article: article._id,
        }).exec();

        if (exercises.length === 0) throw new NotFoundException('No exercises found');

        let correct = 0;
        const feedback: string[] = [];
        const results: {
            exerciseId: Types.ObjectId;
            question: string;
            userAnswer: string;
            correctAnswer: string;
            isCorrect: boolean;
            aiFeedback?: string;
        }[] = [];

        // 3. Prepare AI inputs (only open-ended)
        const aiExercises: AiExerciseInput[] = exercises
            .filter(ex => ex.type === 'fill_in_the_blank' || ex.type === 'short_answer')
            .map(ex => ({
                exerciseId: ex._id.toString(),
                question: ex.question || ex.statement || '',
                type: ex.type as 'fill_in_the_blank' | 'short_answer', // cast here only
                correctAnswer: String(ex.answer),
            }));

        const aiUserAnswers: AiUserAnswer[] = dto.answers
            .filter(a => aiExercises.some(ex => ex.exerciseId === a.exerciseId.toString()))
            .map(a => ({
                exerciseId: a.exerciseId.toString(),
                answer: String(a.answer ?? ''),
            }));

        // 4. Call AI once
        let aiResultMap = new Map<string, { score: number; feedback: string }>();
        if (aiExercises.length > 0) {
            try {
                const aiResults = await this.aiService.evaluateReadingAnswers(
                    article.content,
                    aiExercises,
                    aiUserAnswers
                );
                aiResultMap = new Map(aiResults.map(r => [r.exerciseId, r]));
            } catch {
                // AI failure → fallback handled below
            }
        }

        // 5. Evaluate all exercises
        for (const ex of exercises) {
            const userAnswerObj = dto.answers.find(a => a.exerciseId.toString() === ex._id.toString());
            const userAnswer = userAnswerObj?.answer ?? '';
            let isCorrect = false;
            let aiFeedback = '';

            switch (ex.type) {
                case 'multiple_choice':
                case 'true_false':
                    isCorrect = String(userAnswer).trim().toLowerCase() === String(ex.answer).trim().toLowerCase();
                    break;

                case 'fill_in_the_blank':
                case 'short_answer':
                    const aiResult = aiResultMap.get(ex._id.toString());
                    if (aiResult) {
                        isCorrect = aiResult.score >= 70;
                        if (!isCorrect) aiFeedback = aiResult.feedback;
                    } else {
                        // fallback strict comparison
                        isCorrect = String(userAnswer).trim().toLowerCase() === String(ex.answer).trim().toLowerCase();
                    }
                    break;
            }

            if (!isCorrect) {
                feedback.push(
                    `Question: ${ex.question || ex.statement || ex._id}
Your Answer: ${userAnswer}
Correct Answer: ${String(ex.answer)}
${aiFeedback ? `AI Feedback: ${aiFeedback}` : ''}`
                );
            } else {
                correct++;
            }

            results.push({
                exerciseId: ex._id,
                question: ex.question || ex.statement || '',
                userAnswer,
                correctAnswer: String(ex.answer),
                isCorrect,
                aiFeedback,
            });
        }

        // 6. Score
        const total = exercises.length;
        const score = Math.round((correct / total) * 100);

        // 7. Save history WITH results
        const history = await this.historyModel.create({
            topic: article.topic,
            article: article._id,
            exercises: exercises.map(e => e._id),
            score,
            correct,
            total,
            feedback,
            results,
        });

        // 8. Return result
        return {
            topic: article.topic,
            score,
            correct,
            total,
            feedback,
            historyId: history._id,
            results,
        };
    }


    /** Get reading history */
    async getHistory(): Promise<ReadingHistory[]> {
        return this.historyModel.find().sort({ createdAt: -1 }).exec();
    }

    async getReadingResult(articleId: string) {
        const article = await this.articleModel.findById(articleId);

        const exercises = await this.exerciseModel.find({
            article: articleId,
        });

        if (!article) {
            throw new NotFoundException('Article not found');
        }

        return {
            topic: article.topic,
            article,
            exercises,
        };
    }

}
