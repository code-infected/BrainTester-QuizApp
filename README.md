# BrainTester
Live : https://braintester.vercel.app/

## Features

- Dynamic quiz questions fetched from Open Trivia DB
- 30-minute time limit per quiz session
- Real-time progress tracking
- Detailed results page with score analysis
- Mobile-responsive design
- Beautiful UI with smooth animations
- Question navigation with progress indicators

## Project Structure

```
quiz-application/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── questions/
│   │   │       └── route.ts      # API endpoint for fetching questions
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout component
│   │   └── page.tsx              # Main page component
│   ├── components/
│   │   ├── Question.tsx          # Question display component
│   │   ├── QuestionNavigation.tsx # Question navigation UI
│   │   ├── QuizApp.tsx           # Main quiz application component
│   │   ├── QuizReport.tsx        # Results page component
│   │   └── Timer.tsx             # Quiz timer component
│   ├── context/
│   │   └── QuizContext.tsx       # Quiz state management
│   └── types.ts                  # TypeScript type definitions
├── public/
├── tailwind.config.ts            # Tailwind CSS configuration
├── next.config.mjs               # Next.js configuration
└── package.json                  # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/code-infected/BrainTester-QuizApp.git
cd BrainTester-QuizApp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo

<video width="320" height="240" controls>
  <source src="https://github.com/user-attachments/assets/c30b1601-62e6-4b50-b5da-52e7f48f5734" type="video/mp4">
  Your browser does not support the video tag.
</video>

## 🛠️ Technical Implementation

### State Management
- Uses React Context API for global state management
- Implements a reducer pattern for predictable state updates
- Manages quiz state including:
  - Questions and answers
  - Timer
  - Navigation
  - User progress

### API Integration
- Fetches questions from Open Trivia DB
- Implements error handling and loading states
- Uses Zod for runtime type validation of API responses

### UI/UX Design
- Built with Tailwind CSS for responsive design
- Uses Lucide React for consistent iconography
- Implements smooth transitions and loading states
- Provides clear feedback for user interactions

## 🤔 Assumptions

1. Users have a stable internet connection for fetching questions
2. Quiz sessions are single-player only
3. Users complete the quiz in one session (no save/resume functionality)
4. Email verification is not required for quiz participation
5. Questions from the API are in English

## 💪 Challenges and Solutions

### 1. State Management
**Challenge**: Managing complex quiz state including timer, answers, and navigation.
**Solution**: Implemented a comprehensive Context API solution with a reducer pattern for predictable state updates.

### 2. Race Conditions
**Challenge**: Handling potential race conditions during question fetching.
**Solution**: Implemented proper loading states and error handling in the API integration.

### 3. Timer Synchronization
**Challenge**: Maintaining accurate timer state across component re-renders.
**Solution**: Used React's useEffect hook with proper cleanup to prevent memory leaks and ensure accurate timing.

### 4. Question Navigation
**Challenge**: Creating an intuitive navigation system that tracks progress.
**Solution**: Implemented a visual navigation component with status indicators for answered/unanswered questions.

### 5. HTML Sanitization
**Challenge**: Safely rendering HTML content from the API.
**Solution**: Used React's dangerouslySetInnerHTML with proper content validation.

### 6. Loading State Management
**Challenge**: Providing feedback during the initial question loading phase.
**Solution**: Implemented a loading state with an animated spinner and proper error handling to enhance user experience.

### 7. Answer Randomization
**Challenge**: Ensuring fair presentation of answers without revealing the correct one.
**Solution**: Implemented a shuffle algorithm for answer options while maintaining consistency within each question.

### 8. Progress Persistence
**Challenge**: Maintaining quiz progress and preventing accidental refreshes.
**Solution**: Implemented state management that tracks visited questions and answers, with visual indicators for progress.

### 9. Mobile Responsiveness
**Challenge**: Creating a seamless experience across different device sizes.
**Solution**: Utilized Tailwind CSS's responsive classes and flexible layouts to ensure proper rendering on all devices.

### 10. Quiz Completion Logic
**Challenge**: Handling various quiz completion scenarios (timeout, manual submission).
**Solution**: Implemented robust completion logic that handles both timer-based and manual quiz submissions while preserving user answers.


## Security Considerations

- API responses are validated using Zod
- No sensitive data is stored in local storage
- HTML content from the API is handled safely
- Rate limiting is implemented on the API endpoint
