export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  visitedQuestions: Set<number>;
  timeRemaining: number;
  email: string;
  isQuizComplete: boolean;
  isLoading: boolean;
}

export interface QuizContextType {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

export type QuizAction =
  | { type: 'SET_QUESTIONS'; payload: Question[] }
  | { type: 'SET_CURRENT_QUESTION'; payload: number }
  | { type: 'SET_ANSWER'; payload: { index: number; answer: string } }
  | { type: 'VISIT_QUESTION'; payload: number }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'COMPLETE_QUIZ' };