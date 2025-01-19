'use client';

import React, { useMemo } from 'react';
import { useQuiz } from '@/context/QuizContext';

export function Question() {
  const { state, dispatch } = useQuiz();
  const question = state.questions[state.currentQuestionIndex];

  const allAnswers = useMemo(() => {
    if (!question) return [];
    return [...question.incorrect_answers, question.correct_answer]
      .sort(() => Math.random() - 0.5);
  }, [question]);

  if (!question) return null;

  const handleAnswerSelect = (answer: string) => {
    dispatch({
      type: 'SET_ANSWER',
      payload: { index: state.currentQuestionIndex, answer },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold" 
          dangerouslySetInnerHTML={{ __html: question.question }} />
      
      <div className="space-y-3">
        {allAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(answer)}
            className={`w-full p-4 text-left rounded-lg transition-colors
              ${state.answers[state.currentQuestionIndex] === answer
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-50'}`}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
}