import { Injectable, Logger } from '@nestjs/common';
import { Vocabulary, VocabularyDocument } from './databases/schemas/vocabulary.schema';
import { WritingSubmission, WritingSubmissionDocument } from './databases/schemas/writting.schema';
import { ReadingHistory, ReadingHistoryDocument } from './databases/schemas/reading.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectModel(Vocabulary.name) private vocabModel: Model<VocabularyDocument>,
    @InjectModel(ReadingHistory.name) private readingHistoryModel: Model<ReadingHistoryDocument>,
    @InjectModel(WritingSubmission.name) private writingModel: Model<WritingSubmissionDocument>,
    private readonly configService: ConfigService, // inject config
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getDashboardData() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const vocabCountToday = await this.vocabModel.countDocuments({
      createdAt: { $gte: today },
    });

    const readingCountToday = await this.readingHistoryModel.countDocuments({
      createdAt: { $gte: today },
    });

    const writingCountToday = await this.writingModel.countDocuments({
      createdAt: { $gte: today },
    });

    return {
      dailyGoals: [
        {
          title: 'Vocabulary',
          progress: Math.min(Math.round((vocabCountToday / 7) * 100), 100),
          newItems: 7,
          completed: vocabCountToday,
          icon: 'style',
          color: 'blue',
        },
        {
          title: 'Reading',
          progress: Math.min(Math.round((readingCountToday / 1) * 100), 100),
          newItems: 1,
          completed: readingCountToday,
          icon: 'menu_book',
          color: 'purple',
        },
        {
          title: 'Writing',
          progress: Math.min(Math.round((writingCountToday / 1) * 100), 100),
          newItems: 1,
          completed: writingCountToday,
          icon: 'edit_note',
          color: 'green',
        },
      ],
      categoryProgress: [
        { category: 'Vocabulary', progress: Math.min(Math.round((vocabCountToday / 7) * 100), 100) },
        { category: 'Reading', progress: Math.min(Math.round((readingCountToday / 1) * 100), 100) },
        { category: 'Writing', progress: Math.min(Math.round((writingCountToday / 1) * 100), 100) },
      ],
    };
  }

  // ================= Telegram Reminder Cron =================
  @Cron(CronExpression.EVERY_DAY_AT_5PM) // testing: every 10 seconds
  async checkProgressAndNotify() {
    this.logger.log('Checking user progress for Telegram reminders...');

    try {
      const dashboard = await this.getDashboardData();
      const chatId = this.configService.get<string>('TELEGRAM_CHAT_ID');

      if (!chatId) {
        this.logger.warn('No TELEGRAM_CHAT_ID configured in .env');
        return;
      }

      const incompleteGoals = dashboard.dailyGoals.filter(
        (goal) => goal.completed < goal.newItems,
      );

      if (incompleteGoals.length === 0) {
        this.logger.log('All goals completed, no message sent.');
        return;
      }

      const message =
        `Hi! You have incomplete tasks today:\n` +
        incompleteGoals
          .map((g) => `- ${g.title}: ${g.completed}/${g.newItems} completed`)
          .join('\n') +
        `\nPlease complete them!`;

      await this.sendMessage(chatId, message);
    } catch (error) {
      this.logger.error('Failed to check progress or send Telegram messages', error);
    }
  }

  private async sendMessage(chatId: string, text: string) {
    const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (!botToken) {
      this.logger.warn('No TELEGRAM_BOT_TOKEN configured in .env');
      return;
    }

    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;
      await fetch(url);
      this.logger.log(`Message sent to ${chatId}: ${text}`);
    } catch (err) {
      this.logger.error('Failed to send Telegram message', err);
    }
  }
}
