import { useEffect, useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string[];
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
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


 





  return (
    <div className="min-h-screen p-8 bg-gray-50">
     
    </div>
  );
}

export default App;