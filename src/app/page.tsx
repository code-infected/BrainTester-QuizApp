import { BrainCircuit, Send, Sparkles } from 'lucide-react';
import { QuizProvider } from '@/context/QuizContext';
import { QuizApp } from '@/components/QuizApp';

export default function Home() {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
}