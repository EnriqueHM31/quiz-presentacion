export type QuestionType = 'text' | 'image';

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  imageUrl?: string;
  answers: Answer[];
}

export interface UserQuiz {
  userName: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: { [questionId: number]: number }; // questionId -> answerIndex
  answeredQuestions: { [questionId: number]: boolean }; // questionId -> answered
  completed: boolean;
  createdAt: string;
}

