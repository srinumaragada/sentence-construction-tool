import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Timer } from 'lucide-react';
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string[];
}

function App() {
    const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; userAnswer: string[]; correct: boolean }[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetch('http://localhost:3000/questions')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No questions available');
        }
        setQuestions(data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        setError('Failed to load questions. Please ensure the JSON server is running at http://localhost:3000');
      });
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && questions.length > 0) {
      handleNextQuestion();
    }
  }, [timeLeft, isGameOver, questions]);

  const handleWordSelect = (word: string) => {
    if (!questions[currentQuestionIndex]) return;
    
    if (selectedWords.includes(word)) {
      setSelectedWords(prev => prev.filter(w => w !== word));
    } else if (selectedWords.length < questions[currentQuestionIndex].correctAnswer.length) {
      setSelectedWords(prev => [...prev, word]);
    }
  };

  const handleNextQuestion = () => {
    if (!questions.length || currentQuestionIndex >= questions.length) return;

    // Save current answer
    const currentQuestion = questions[currentQuestionIndex];
    console.log(selectedWords);
    
    const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(currentQuestion.correctAnswer);
    
    setAnswers(prev => [...prev, {
      question: currentQuestion.question,
      userAnswer: selectedWords,
      correct: isCorrect
    }]);

    if (isCorrect) setScore(prev => prev + 1);

    // Move to next question or end game
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedWords([]);
      setTimeLeft(30);
    } else {
      setIsGameOver(true);
    }
  };
 
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-center">Loading...</h2>
        </Card>
      </div>
    );
  }

  if (isGameOver) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <Card className="max-w-2xl mx-auto p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Game Over!</h2>
          <div className="text-center mb-8">
            <p className="text-2xl font-semibold">Your Score: {score} / {questions.length}</p>
            <Progress value={(score / questions.length) * 100} className="mt-4" />
          </div>
          <div className="space-y-6">
            {answers.map((answer, index) => (
              <Card key={index} className={`p-6 ${answer.correct ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className="font-medium mb-2">Question {index + 1}:</p>
                <p className="mb-2">{answer.question}</p>
                <p className="text-sm">Your answer: {answer.userAnswer.join(', ')}</p>
                {!answer.correct && (
                  <p className="text-sm text-green-600 mt-2">
                    Correct answer: {questions[index].correctAnswer.join(', ')}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const words = currentQuestion.question.split(' ');




  return (
    <div className="min-h-screen p-8 bg-gray-50">
     
    </div>
  );
}

export default App;