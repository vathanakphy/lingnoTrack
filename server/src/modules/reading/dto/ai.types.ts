export type AiExerciseType = 'fill_in_the_blank' | 'short_answer';

export interface AiExerciseInput {
  exerciseId: string;
  question: string;
  type: AiExerciseType;
  correctAnswer: string;
}

export interface AiUserAnswer {
  exerciseId: string;
  answer: string;
}

export interface AiExerciseResult {
  exerciseId: string;
  score: number;   // 0–100
  feedback: string;
}
