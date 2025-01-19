'use client';

import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useQuiz } from '@/context/QuizContext';

export function Timer() {
  const { state, dispatch } = useQuiz();

  useEffect(() => {
    const timer = setInterval(() => {
      if (state.timeRemaining > 0 && !state.isQuizComplete) {
        dispatch({ type: 'UPDATE_TIME', payload: state.timeRemaining - 1 });
      } else if (state.timeRemaining === 0 && !state.isQuizComplete) {
        dispatch({ type: 'COMPLETE_QUIZ' });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [state.timeRemaining, state.isQuizComplete]);

  const minutes = Math.floor(state.timeRemaining / 60);
  const seconds = state.timeRemaining % 60;

  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      <Clock className="w-5 h-5" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}