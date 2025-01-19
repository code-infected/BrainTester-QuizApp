'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { QuizState, QuizAction, QuizContextType } from '../types';

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  visitedQuestions: new Set(),
  timeRemaining: 30 * 60, // 30 minutes in seconds
  email: '',
  isQuizComplete: false,
  isLoading: false,
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload, isLoading: false };
    case 'SET_CURRENT_QUESTION':
      return { ...state, currentQuestionIndex: action.payload };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.payload.index]: action.payload.answer },
      };
    case 'VISIT_QUESTION':
      const newVisited = new Set(state.visitedQuestions);
      newVisited.add(action.payload);
      return { ...state, visitedQuestions: newVisited };
    case 'UPDATE_TIME':
      return { ...state, timeRemaining: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'COMPLETE_QUIZ':
      return { ...state, isQuizComplete: true };
    default:
      return state;
  }
}

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}