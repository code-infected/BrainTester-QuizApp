'use client';

import React from 'react';
import { useQuiz } from '@/context/QuizContext';
import { CheckCircle, XCircle, Trophy, Clock, Award, Brain, Home } from 'lucide-react';

export function QuizReport() {
  const { state, dispatch } = useQuiz();

  const correctAnswers = state.questions.reduce((count, question, index) => {
    return count + (state.answers[index] === question.correct_answer ? 1 : 0);
  }, 0);

  const scorePercentage = (correctAnswers / state.questions.length) * 100;
  const timeSpent = 30 * 60 - state.timeRemaining; // in seconds
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6 animate-fadeIn">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 shadow-lg text-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="w-8 h-8" /> Quiz Results
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Time taken: {minutes}m {seconds}s</span>
            </div>
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg px-4 py-2"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-lg mb-2">
              <Brain className="w-5 h-5" /> Score
            </div>
            <div className="text-3xl font-bold">{scorePercentage.toFixed(1)}%</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-lg mb-2">
              <CheckCircle className="w-5 h-5" /> Correct
            </div>
            <div className="text-3xl font-bold">{correctAnswers}</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-lg mb-2">
              <Award className="w-5 h-5" /> Total Questions
            </div>
            <div className="text-3xl font-bold">{state.questions.length}</div>
          </div>
        </div>

        <div className="mt-6 text-lg">
          <span className="font-medium">Email:</span> {state.email}
        </div>
      </div>

      <div className="space-y-6">
        {state.questions.map((question, index) => {
          const isCorrect = state.answers[index] === question.correct_answer;
          return (
            <div 
              key={index} 
              className={`bg-white rounded-lg p-6 shadow-md transition-all hover:shadow-lg
                ${isCorrect ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold flex-1" 
                    dangerouslySetInnerHTML={{ __html: question.question }} />
                <div className="flex-shrink-0">
                  {isCorrect ? (
                    <div className="flex items-center gap-1 text-green-500">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-medium">Correct</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-500">
                      <XCircle className="w-6 h-6" />
                      <span className="font-medium">Incorrect</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className={`p-3 rounded-lg ${
                  state.answers[index] === question.correct_answer
                    ? 'bg-green-50 border border-green-200'
                    : state.answers[index]
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="font-medium mb-1">Your Answer:</div>
                  <div dangerouslySetInnerHTML={{ 
                    __html: state.answers[index] || 'Not answered'
                  }} />
                </div>
                
                {state.answers[index] !== question.correct_answer && (
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="font-medium mb-1">Correct Answer:</div>
                    <div dangerouslySetInnerHTML={{ 
                      __html: question.correct_answer 
                    }} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}