import { useEffect, useState } from 'react';

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
 





  return (
    <div className="min-h-screen p-8 bg-gray-50">
     
    </div>
  );
}

export default App;