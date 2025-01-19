import { NextResponse } from 'next/server';
import { z } from 'zod';

const QuestionSchema = z.object({
  category: z.string(),
  type: z.string(),
  difficulty: z.string(),
  question: z.string(),
  correct_answer: z.string(),
  incorrect_answers: z.array(z.string()),
});

const QuestionsResponseSchema = z.object({
  response_code: z.number(),
  results: z.array(QuestionSchema),
});

export async function GET() {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=15');
    const data = await response.json();
    
    // Validate the response data
    const validatedData = QuestionsResponseSchema.parse(data);
    
    return NextResponse.json(validatedData.results);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}