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
    <Card className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5" />
          <span className="font-mono">{timeLeft}s</span>
        </div>
      </div>

      <Progress value={(timeLeft / 30) * 100} className="mb-8" />

      <div className="mb-8">
        <p className="text-lg leading-relaxed">
          {words.map((word, index) => {
            if (word === '_____________') {
              const blankIndex = words.slice(0, index).filter(w => w === '_____________').length;
              return (
                <span
                  key={index}
                  className={`inline-block min-w-[100px] mx-1 px-3 py-1 border-2 rounded ${
                    selectedWords[blankIndex]
                      ? 'bg-blue-100 border-blue-300 cursor-pointer'
                      : 'border-gray-300'
                  }`}
                  onClick={() => {
                    if (selectedWords[blankIndex]) {
                      handleWordSelect(selectedWords[blankIndex]);
                    }
                  }}
                >
                  {selectedWords[blankIndex] || ''}
                </span>
              );
            }
            return <span key={index}> {word} </span>;
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {currentQuestion.options.map((option, index) => (
          <Button
            key={index}
            variant={selectedWords.includes(option) ? 'secondary' : 'outline'}
            className="w-full"
            onClick={() => handleWordSelect(option)}
            disabled={selectedWords.includes(option)}
          >
            {option}
          </Button>
        ))}
      </div>

      <Button
        className="w-full"
        disabled={selectedWords.length !== currentQuestion.correctAnswer.length}
        onClick={handleNextQuestion}
      >
        Next Question
      </Button>
    </Card>
  </div>
  );
}

export default App;