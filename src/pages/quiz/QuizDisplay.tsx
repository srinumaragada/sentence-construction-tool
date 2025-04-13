import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Timer } from 'lucide-react';
import { motion } from 'framer-motion';

function QuizDisplay({
  currentQuestion,
  currentQuestionIndex,
  questions,
  timeLeft,
  selectedWords,
  handleWordSelect,
  handleNextQuestion,
  handleQuit
}: any) {
  const words = currentQuestion.question.split(' ');
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const allAnswersSelected = selectedWords.length === currentQuestion.correctAnswer.length;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-yellow-300 to-yellow-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl mx-auto bg-blue-100"
      >
        <Card className="p-6 md:p-8 shadow-lg rounded-xl">
         
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Question</span>
              <span className="text-lg font-bold text-indigo-600">
                {currentQuestionIndex + 1}<span className="text-gray-400">/{questions.length}</span>
              </span>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
              <Timer className="w-4 h-4 text-gray-600" />
              <span className="font-mono font-medium text-gray-700">{timeLeft}s</span>
            </div>
          </div>

          
          <Progress
            value={(timeLeft / 30) * 100}
            className={`h-2.5 mb-8 bg-gray-200 rounded-full [&>*]:transition-all [&>*]:duration-300 ${
              timeLeft > 10 ? '[&>*]:bg-green-500' : '[&>*]:bg-rose-500'
            } ${timeLeft <= 5 ? 'animate-pulse' : ''}`}
          />

         
          <div className="mb-8">
            <p className="text-lg md:text-xl leading-relaxed text-gray-800">
              {words.map((word: string, index: number) => {
                if (word === '_____________') {
                  const blankIndex = words.slice(0, index).filter((w: string) => w === '_____________').length;
                  return (
                    <motion.span
                      key={index}
                      whileHover={selectedWords[blankIndex] ? { scale: 1.05 } : {}}
                      whileTap={selectedWords[blankIndex] ? { scale: 0.95 } : {}}
                      className={`inline-block min-w-[80px] md:min-w-[100px] mx-1 px-2 py-1 border-2 rounded-xl ${
                        selectedWords[blankIndex]
                          ? 'bg-blue-50 border-blue-300 cursor-pointer shadow-sm'
                          : 'border-gray-300 bg-white'
                      }`}
                      onClick={() => {
                        if (selectedWords[blankIndex]) {
                          handleWordSelect(selectedWords[blankIndex]);
                        }
                      }}
                    >
                      <span className={`${selectedWords[blankIndex] ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                        {selectedWords[blankIndex] || '______'}
                      </span>
                    </motion.span>
                  );
                }
                return <span key={index}> {word} </span>;
              })}
            </p>
          </div>

        
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {currentQuestion.options.map((option: string, index: number) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={selectedWords.includes(option) ? 'secondary' : 'outline'}
                  className={`w-full h-14 text-base transition-all rounded-xl ${
                    selectedWords.includes(option) 
                      ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleWordSelect(option)}
                  disabled={selectedWords.includes(option)}
                >
                  {option}
                </Button>
              </motion.div>
            ))}
          </div>

          
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.div 
              className="w-full"
              whileHover={allAnswersSelected ? { scale: 1.01 } : {}}
              whileTap={allAnswersSelected ? { scale: 0.99 } : {}}
            >
              <Button
                className="w-full h-12 rounded-xl text-base bg-gradient-to-r from-green-400 to-green-600 hover:from-blue-700 hover:to-blue-700 text-white"
                disabled={!allAnswersSelected}
                onClick={handleNextQuestion}
              >
                {isLastQuestion ? (
                  <span className="flex items-center gap-2">
                    Finish Quiz <span className="text-lg">🎉</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Next Question <span>→</span>
                  </span>
                )}
              </Button>
            </motion.div>
            
            <Button 
              variant="destructive" 
              className="w-full h-12 text-base rounded-xl gap-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white"
              onClick={handleQuit}
            >
              Quit Quiz
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default QuizDisplay; 