import React, { useEffect } from 'react';
import { Timer } from './components/Timer';
import { QuestionNavigation } from './components/QuestionNavigation';
import { Question } from './components/Question';
import { QuizReport } from './components/QuizReport';
import { QuizProvider, useQuiz } from './context/QuizContext';
import { ArrowLeft, ArrowRight, Send, BrainCircuit, Sparkles } from 'lucide-react';

function QuizApp() {
  const { state, dispatch } = useQuiz();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=15');
        const data = await response.json();
        dispatch({ type: 'SET_QUESTIONS', payload: data.results });
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (state.email && state.questions.length === 0) {
      fetchQuestions();
    }
  }, [state.email]);

  if (state.isQuizComplete) {
    return <QuizReport />;
  }

  if (!state.email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 animate-fadeIn">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <BrainCircuit className="w-20 h-20" />
            </div>
            <h1 className="text-4xl font-bold mb-2">BrainTester</h1>
            <p className="text-lg opacity-90"></p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                  Get Started
                </h2>
                <p className="text-gray-600">Enter your email to begin the quiz challenge</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = new FormData(e.currentTarget).get('email') as string;
                  dispatch({ type: 'SET_EMAIL', payload: email });
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Start Quiz <Send className="w-4 h-4" />
                </button>
              </form>

             
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-xl font-bold">BrainTester</h1>
          <Timer />
        </div>

        <QuestionNavigation />

        <div className="bg-white rounded-lg shadow-md p-6">
          <Question />

          <div className="flex justify-between mt-6">
            <button
              onClick={() => {
                if (state.currentQuestionIndex > 0) {
                  dispatch({
                    type: 'SET_CURRENT_QUESTION',
                    payload: state.currentQuestionIndex - 1,
                  });
                }
              }}
              disabled={state.currentQuestionIndex === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            {state.currentQuestionIndex === state.questions.length - 1 ? (
              <button
                onClick={() => dispatch({ type: 'COMPLETE_QUIZ' })}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
              >
                Submit Quiz <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (state.currentQuestionIndex < state.questions.length - 1) {
                    dispatch({
                      type: 'SET_CURRENT_QUESTION',
                      payload: state.currentQuestionIndex + 1,
                    });
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
}

export default App;