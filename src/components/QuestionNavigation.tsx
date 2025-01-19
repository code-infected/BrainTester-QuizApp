'use client';

import React from 'react';
import { useQuiz } from '@/context/QuizContext';

export function QuestionNavigation() {
  const { state, dispatch } = useQuiz();

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow-md">
      {state.questions.map((_, index) => {
        const isVisited = state.visitedQuestions.has(index);
        const isAnswered = state.answers[index] !== undefined;
        const isCurrent = state.currentQuestionIndex === index;

        return (
          <button
            key={index}
            onClick={() => dispatch({ type: 'SET_CURRENT_QUESTION', payload: index })}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors
              ${isCurrent ? 'ring-2 ring-blue-500' : ''}
              ${isAnswered ? 'bg-green-500 text-white' : 
                isVisited ? 'bg-yellow-100 text-gray-700' : 'bg-gray-100 text-gray-700'}`}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}