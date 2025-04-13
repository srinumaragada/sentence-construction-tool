import { useEffect, useState } from 'react';
import LoadingDisplay from './LoadingDispaly';
import QuizDisplay from './QuizDisplay';
import ResultsDisplay from './ResultDisplay';
import ErrorDisplay from './ErrorDispaly';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string[];
}

function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; userAnswer: string[]; correct: boolean }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasProcessedLastQuestion, setHasProcessedLastQuestion] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/questions`)
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(error => setError(error.message));
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && questions.length > 0 && !hasProcessedLastQuestion) {
      handleNextQuestion();
    }
  }, [timeLeft, isGameOver, questions, hasProcessedLastQuestion]);

  const handleWordSelect = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(prev => prev.filter(w => w !== word));
    } else {
      setSelectedWords(prev => [...prev, word]);
    }
  };

  const handleQuit = () => {
    setIsGameOver(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex >= questions.length) {
      setIsGameOver(true);
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
      setIsGameOver(true);
      return;
    }

    const isCorrect = selectedWords.length === currentQuestion.correctAnswer.length &&
                     JSON.stringify(selectedWords) === JSON.stringify(currentQuestion.correctAnswer);

    if (!answers.some(ans => ans.question === currentQuestion.question)) {
      setAnswers(prev => [...prev, {
        question: currentQuestion.question,
        userAnswer: [...selectedWords],
        correct: isCorrect
      }]);

      if (isCorrect) setScore(prev => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedWords([]);
      setTimeLeft(30);
    } else {
      setHasProcessedLastQuestion(true);
      setIsGameOver(true);
    }
  };

  if (error) return <ErrorDisplay message={error} />;
  if (questions.length === 0) return <LoadingDisplay />;
  if (isGameOver) return <ResultsDisplay score={score} questions={questions} answers={answers} />;

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return <LoadingDisplay />;

  return (
    <QuizDisplay
      currentQuestion={currentQuestion}
      currentQuestionIndex={currentQuestionIndex}
      questions={questions}
      timeLeft={timeLeft}
      selectedWords={selectedWords}
      handleWordSelect={handleWordSelect}
      handleNextQuestion={handleNextQuestion}
      handleQuit={handleQuit}
    />
  );
}

export default QuizPage;
