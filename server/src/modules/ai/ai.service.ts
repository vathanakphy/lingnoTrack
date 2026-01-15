import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import { WritingEvaluationDto } from './dto/writing-evaluation.dto';
import { WritingTopicDto } from './dto/writing-topic.dto';
import { safeParseJson } from 'src/utils/safeParseJson';
import { AIGeneratedReadingDto } from '../reading/dto/ai-exercise.dto';
import { AiExerciseInput, AiExerciseResult, AiUserAnswer } from '../reading/dto/ai.types';

@Injectable()
export class AiService {
    private client: GoogleGenAI;

    constructor(private readonly configService: ConfigService) {
        const apiKey = this.configService.get<string>('GOOGLE_API_KEY');

        this.client = new GoogleGenAI({
            apiKey,
        });
    }

    /**
     * Generate a writing topic with hint
     */
    async generateWritingTopic(): Promise<WritingTopicDto> {
const prompt = `
Objective:
Generate a simple writing topic for high school students.
The topic can be any type: advantages/disadvantages, agree/disagree, opinion, or any simple essay idea.

Instructions:
- Provide one topic in JSON format ONLY:
{
  "topic": "[Essay - Type] Example topic here",
  "hint": "Short structure + key ideas to include (for brainstorming)"
}
- Replace "Type" with the essay style: Persuasive, Expository, Narrative, Opinion, or Descriptive.
- Each topic must be **different from previous ones**.
- Topics must be easy for high school students to write about.
- Focus on education, environment, social issues, school life, or daily life.
- Avoid adult, workplace, or technical topics.
- The hint MUST:
  - Briefly show the essay structure (e.g., introduction, body points, conclusion)
  - Mention 2–3 key ideas students should include
  - Be short and simple (not a full outline)
- Do NOT include any text outside the JSON.
- Return ONLY valid JSON.

System instructions:
You are an English writing tutor for high school students.
Return only valid JSON.

Tone:
Encouraging and instructive.
`;



        const response = await this.client.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: { temperature: 0.8 },
        });

        const text = response?.text ?? '';
        console.log('AI Response for Topic:', text);

        return safeParseJson<WritingTopicDto>(text, {
            topic: '[Essay - Opinion] Error: AI returned invalid topic',
            hint: 'AI returned invalid JSON',
        });
    }


    /**
     * Evaluate writing submission
     */
    async evaluateWriting(textToEvaluate: string): Promise<WritingEvaluationDto> {
        const prompt = `
        Objective:
        Evaluate the following writing and provide detailed feedback in JSON.

        Instructions:
        1. Score the writing 0-100
        2. Provide detailed feedback array
        3. Provide stats for vocabulary and readability
        4. Return JSON in the format:

        {
        "score": 0,
        "feedback": [
            "..."
        ],
        "stats": {
            "vocabulary": "...",
            "readability": "..."
        }
        }

        Writing text:
        "${textToEvaluate}"

        System instructions:
        You are a professional writing tutor. Give constructive improvement suggestions.
        Constraints:
        Return only valid JSON.
        Tone:
        Constructive and encouraging.
        `;

        const response = await this.client.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                temperature: 0.2,
            },
        });

        const text = response?.text ?? '{}';

        try {
            return JSON.parse(text) as WritingEvaluationDto;
        } catch (err) {
            console.error('Failed to parse AI JSON:', text);
            return {
                score: 0,
                feedback: ['AI returned invalid JSON'],
                stats: { vocabulary: 'Unknown', readability: 'Unknown' },
            };
        }
    }

    async generateExercisesArticle(articleMarkdown: string): Promise<AIGeneratedReadingDto> {
        // --- Step 1: Generate Exercises ---
        const exercisesPrompt = `
Objective:
Generate 10 reading exercises from the following article in Markdown.

Instructions:
- Use multiple formats: multiple_choice, true_false, fill_in_the_blank, short_answer.
- For each exercise, use ONLY strict JSON formats (see below):

Multiple Choice:
{
  "type": "multiple_choice",
  "question": "...",
  "options": ["...", "...", "...", "..."],
  "answer": "..."
}

True/False:
{
  "type": "true_false",
  "statement": "...",
  "answer": true
}

Fill-in-the-Blank:
{
  "type": "fill_in_the_blank",
  "sentence": "...",
  "answer": "..."
}

Short Answer:
{
  "type": "short_answer",
  "question": "...",
  "answer": "..."
}

Return ONLY valid JSON in this format:
{
  "exercises": [ ... ]
}

Article text:
"${articleMarkdown}"
`;
        const exercisesResponse = await this.client.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: exercisesPrompt,
            config: { temperature: 0.8 },
        });

        const exercisesText = exercisesResponse?.text ?? '';
        const exercisesParsed: AIGeneratedReadingDto = safeParseJson<AIGeneratedReadingDto>(
            exercisesText,
            { exercises: [], wordsMarkdown: [] },
        );

        // --- Step 2: Generate Vocabulary Words ---
        const wordsPrompt = `
Objective:
Extract key or challenging vocabulary words from the following article.

Instructions:
- Choose 5-15 words that are either difficult or important to understand the article.
- For each word, provide a short definition in this Markdown format:
  word – part_of_speech. definition
  Example: league – n. sports teams that play each other and are linked by a business agreement and rules
- Return ONLY valid JSON in this format:
{
  "wordsMarkdown": [
    "word1 – n. definition",
    "word2 – v. definition",
    "word3 – adj. definition"
  ]
}

Article text:
"${articleMarkdown}"
`;

        const wordsResponse = await this.client.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: wordsPrompt,
            config: { temperature: 0.2 },
        });

        const wordsText = wordsResponse?.text ?? '';
        const wordsParsed = safeParseJson<{ wordsMarkdown: string[] }>(wordsText, { wordsMarkdown: [] });

        // --- Combine AI output ---
        return {
            exercises: exercisesParsed.exercises,
            wordsMarkdown: wordsParsed.wordsMarkdown,
        };
    }


    // ai.service.ts
    async evaluateReadingAnswers(
        articleContent: string,
        exercises: AiExerciseInput[],
        userAnswers: AiUserAnswer[],
    ): Promise<AiExerciseResult[]> {
        const prompt = `
You are an English reading comprehension evaluator.

Rules:
- Use ONLY the article content.
- Evaluate ONLY "fill_in_the_blank" and "short_answer".
- Be fair with paraphrasing.
- Score each answer from 0 to 100.
- Return ONLY valid JSON (no markdown, no text).

Return format:
[
  {
    "exerciseId": "string",
    "score": 0,
    "feedback": "string"
  }
]

Article:
${articleContent}

Exercises:
${JSON.stringify(exercises, null, 2)}

User Answers:
${JSON.stringify(userAnswers, null, 2)}
`;

        const response = await this.client.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: { temperature: 0.8 },
        });

        const text = response?.text ?? '[]';

        return safeParseJson<AiExerciseResult[]>(text, []);
    }
}